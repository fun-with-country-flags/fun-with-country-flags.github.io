const ALLOWED_ORIGINS = [
  'https://fun-with-country-flags.github.io',
  'http://localhost:5500',
  'http://localhost:8080',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:8080',
];

export function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin');
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };

  // Check if origin is allowed
  if (origin) {
    // Allow exact matches
    if (ALLOWED_ORIGINS.includes(origin)) {
      headers['Access-Control-Allow-Origin'] = origin;
    }
    // Allow any localhost or 127.0.0.1 with any port for development
    else if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      headers['Access-Control-Allow-Origin'] = origin;
    }
    // Allow file:// protocol for local file testing
    else if (origin === 'null') {
      headers['Access-Control-Allow-Origin'] = '*';
    }
  }

  return headers;
}

export function corsResponse(request: Request, response: Response): Response {
  const corsHeaders = getCorsHeaders(request);
  const headers = new Headers(response.headers);

  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export function handleOptions(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}
