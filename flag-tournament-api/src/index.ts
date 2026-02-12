import { handleVote } from './handlers/vote';
import { handleLeaderboard } from './handlers/leaderboard';
import { corsResponse, handleOptions } from './utils/cors';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname, searchParams } = url;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }

    let response: Response;

    // Route handling
    if (pathname === '/api/vote' && request.method === 'POST') {
      response = await handleVote(request, env);
    } else if (pathname === '/api/leaderboard' && request.method === 'GET') {
      response = await handleLeaderboard(request, env);
    } else {
      // 404 for unknown routes
      response = new Response(
        JSON.stringify({
          success: false,
          error: 'Not found',
          code: 'NOT_FOUND',
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Add CORS headers to response
    return corsResponse(request, response);
  },
} satisfies ExportedHandler<Env>;
