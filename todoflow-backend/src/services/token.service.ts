import jwt, { JwtPayload } from 'jsonwebtoken';
import { add, parseISO } from 'date-fns';

// Payload type for refresh token
export interface RefreshTokenPayload extends JwtPayload {
  id: string;
}

const JWT_ACCESS_TOKEN_SECRET: string = process.env.JWT_ACCESS_TOKEN_SECRET!;
const JWT_REFRESH_TOKEN_SECRET: string = process.env.JWT_REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRES_IN: string = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const REFRESH_TOKEN_EXPIRES_IN: string = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

if (!JWT_ACCESS_TOKEN_SECRET || !JWT_REFRESH_TOKEN_SECRET) {
  throw new Error('JWT secrets are not defined in env');
}

export function signAccessToken(payload: RefreshTokenPayload) {
  return (jwt as any).sign(payload, JWT_ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

export function signRefreshToken(payload: RefreshTokenPayload) {
  return (jwt as any).sign(payload, JWT_REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

export function verifyAccessToken(token: string): RefreshTokenPayload {
  const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET) as JwtPayload;

  if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
    throw new Error('Invalid access token');
  }

  return decoded as RefreshTokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const decoded = jwt.verify(token, JWT_REFRESH_TOKEN_SECRET) as JwtPayload;

  if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
    throw new Error('Invalid refresh token');
  }

  return decoded as RefreshTokenPayload;
}
