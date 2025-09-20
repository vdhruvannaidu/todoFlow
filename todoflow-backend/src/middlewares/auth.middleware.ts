import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/token.service';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email?: string };
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyAccessToken(token) as { id: string; email?: string; iat?: number; exp?: number };
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
