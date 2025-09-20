import app from './app';
import dotenv from 'dotenv';
import prisma from './db';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // optional: test DB connection
  try {
    await prisma.$connect();
    console.log('Connected to DB');
  } catch (err) {
    console.error('DB connection error', err);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing server.');
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});
