import jwt from 'jsonwebtoken';
import { add, parseISO } from 'date-fns';

const {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN = '15m',
  REFRESH_TOKEN_EXPIRES_IN = '7d'
} = process.env;

if(!JWT_ACCESS_TOKEN_SECRET || !JWT_REFRESH_TOKEN_SECRET) {
  throw new Error('JWT secrets are not defined in env');
}

export function signAccessToken(payload: object) {
  return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, JWT_REFRESH_TOKEN_SECRET);
}
