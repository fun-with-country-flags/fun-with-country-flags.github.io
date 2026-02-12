import { getFlagByCode } from '../utils/flags';
import { validateLimit } from '../utils/validation';
import type { LeaderboardResponse, LeaderboardEntry, ErrorResponse } from '../types';

export async function handleLeaderboard(request: Request, env: Env): Promise<Response> {
  try {
    // Parse query parameters
    const url = new URL(request.url);
    const limitParam = url.searchParams.get('limit');

    // Validate limit
    const { value: limit, error: limitError } = validateLimit(limitParam);
    if (limitError) {
      return jsonError(limitError, 'INVALID_LIMIT', 400);
    }

    // Query leaderboard
    const results = await env.DB.prepare(
      `SELECT flag_code, COUNT(*) as vote_count
       FROM votes
       GROUP BY flag_code
       ORDER BY vote_count DESC
       LIMIT ?`
    )
      .bind(limit)
      .all();

    if (!results.success) {
      console.error('Database query failed:', results);
      return jsonError('Failed to fetch leaderboard', 'DATABASE_ERROR', 500);
    }

    // Get total votes count
    const totalResult = await env.DB.prepare('SELECT COUNT(*) as total FROM votes').first();
    const totalVotes = (totalResult?.total as number) || 0;

    // Enrich with flag metadata
    const leaderboard: LeaderboardEntry[] = results.results.map((row: any, index: number) => {
      const flag = getFlagByCode(row.flag_code);
      return {
        flagCode: row.flag_code,
        flagName: flag?.name || 'Unknown',
        emoji: flag?.emoji || '🏳️',
        voteCount: row.vote_count,
        rank: index + 1,
      };
    });

    const response: LeaderboardResponse = {
      leaderboard,
      totalVotes,
      lastUpdated: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60', // Cache for 60 seconds
      },
    });
  } catch (error) {
    console.error('Error handling leaderboard:', error);
    return jsonError('Internal server error', 'INTERNAL_ERROR', 500);
  }
}

function jsonError(message: string, code: string, status: number): Response {
  const error: ErrorResponse = {
    success: false,
    error: message,
    code,
  };
  return new Response(JSON.stringify(error), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
