import { Request, Response } from 'express';
import prisma from '../db';
import bcrypt from 'bcryptjs';
import { registerSchema, loginSchema } from '../schemas/zod.schemas';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../services/token.service';
import { add } from 'date-fns';

const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);
  if(!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });

  const { email, password, name } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email }});
  if(existing) return res.status(409).json({ message: 'Email already in use' });

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: { email, passwordHash, name }
  });

  const accessToken = signAccessToken({ id: user.id, email: user.email });
  const refreshToken = signRefreshToken({ id: user.id });

  // compute expiry
  const expiresAt = add(new Date(), { days: 7 }); // keep in sync with REFRESH_TOKEN_EXPIRES_IN

  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt }
  });

  res.json({ user: { id: user.id, email: user.email, name: user.name }, accessToken, refreshToken });
};

export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if(!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email }});
  if(!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if(!isValid) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = signAccessToken({ id: user.id, email: user.email });
  const refreshToken = signRefreshToken({ id: user.id });

  const expiresAt = add(new Date(), { days: 7 });
  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt }
  });

  res.json({ user: { id: user.id, email: user.email, name: user.name }, accessToken, refreshToken });
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if(!refreshToken) return res.status(400).json({ message: 'Missing refresh token' });

  try {
    const payload = verifyRefreshToken(refreshToken) as { id: string; iat?: number; exp?: number };
    const dbToken = await prisma.refreshToken.findUnique({ where: { token: refreshToken }});
    if(!dbToken || dbToken.revoked) return res.status(401).json({ message: 'Invalid refresh token' });

    // optionally check expiresAt
    const accessToken = signAccessToken({ id: payload.id });
    const newRefreshToken = signRefreshToken({ id: payload.id });
    const expiresAt = add(new Date(), { days: 7 });

    // revoke old and store new
    await prisma.refreshToken.update({
      where: { token: refreshToken },
      data: { revoked: true }
    });
    await prisma.refreshToken.create({
      data: { token: newRefreshToken, userId: payload.id, expiresAt }
    });

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if(!refreshToken) return res.status(400).json({ message: 'Missing refresh token' });

  await prisma.refreshToken.updateMany({
    where: { token: refreshToken },
    data: { revoked: true }
  });

  res.json({ message: 'Logged out' });
};
