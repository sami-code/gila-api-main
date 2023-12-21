import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const user = await prisma.user.create({ data: req.body });
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
});

export default usersRouter;
