import { isValidFlagCode } from './flags';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateFlagCode(code: unknown): string | null {
  if (typeof code !== 'string') {
    return 'Flag code must be a string';
  }

  if (code.length !== 2) {
    return 'Flag code must be 2 characters';
  }

  const lowerCode = code.toLowerCase();
  if (!isValidFlagCode(lowerCode)) {
    return 'Invalid flag code';
  }

  return null; // Valid
}

export function validateSessionId(sessionId: unknown): string | null {
  if (typeof sessionId !== 'string') {
    return 'Session ID must be a string';
  }

  if (!UUID_REGEX.test(sessionId)) {
    return 'Session ID must be a valid UUID v4';
  }

  return null; // Valid
}

export function validateLimit(limit: unknown): { value: number; error: string | null } {
  const defaultLimit = 10;
  const maxLimit = 50;

  if (limit === undefined || limit === null || limit === '') {
    return { value: defaultLimit, error: null };
  }

  const numLimit = typeof limit === 'string' ? parseInt(limit, 10) : Number(limit);

  if (isNaN(numLimit)) {
    return { value: defaultLimit, error: 'Limit must be a number' };
  }

  if (numLimit < 1) {
    return { value: defaultLimit, error: 'Limit must be at least 1' };
  }

  if (numLimit > maxLimit) {
    return { value: maxLimit, error: null }; // Clamp to max, don't error
  }

  return { value: numLimit, error: null };
}
