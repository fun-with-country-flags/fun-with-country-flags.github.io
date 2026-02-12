import { validateFlagCode, validateSessionId } from '../utils/validation';
import type { VoteRequest, VoteResponse, ErrorResponse } from '../types';

export async function handleVote(request: Request, env: Env): Promise<Response> {
  try {
    // Parse request body
    let body: VoteRequest;
    try {
      body = await request.json();
    } catch {
      return jsonError('Invalid JSON body', 'INVALID_JSON', 400);
    }

    const { flagCode, sessionId } = body;

    // Validate flag code
    const flagError = validateFlagCode(flagCode);
    if (flagError) {
      return jsonError(flagError, 'INVALID_FLAG_CODE', 400);
    }

    // Validate session ID
    const sessionError = validateSessionId(sessionId);
    if (sessionError) {
      return jsonError(sessionError, 'INVALID_SESSION_ID', 400);
    }

    // Normalize flag code to lowercase
    const normalizedFlagCode = flagCode.toLowerCase();

    // Check if session has already voted
    const existingVote = await env.DB.prepare(
      'SELECT id FROM votes WHERE session_id = ? LIMIT 1'
    )
      .bind(sessionId)
      .first();

    if (existingVote) {
      return jsonError('Session has already voted', 'DUPLICATE_VOTE', 400);
    }

    // Insert vote
    const result = await env.DB.prepare(
      'INSERT INTO votes (flag_code, session_id) VALUES (?, ?)'
    )
      .bind(normalizedFlagCode, sessionId)
      .run();

    if (!result.success) {
      console.error('Database insert failed:', result);
      return jsonError('Failed to record vote', 'DATABASE_ERROR', 500);
    }

    const response: VoteResponse = {
      success: true,
      voteId: result.meta.last_row_id,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error handling vote:', error);
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
