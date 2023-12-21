import { Router } from 'express';
import { UserOperations } from '../userOperations';
import { MessageSender } from '../messageSender';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const messagesRouter = Router();

messagesRouter.post('/send_message', async (req, res) => {
  try {
    const category = req.body.category;
    const message = req.body.message;
    const users = await UserOperations.getUsersBySubscription(category);
    MessageSender.sendSms(users, message, category);
    MessageSender.sendEmail(users, message, category);
    MessageSender.sendNotification(users, message, category);
    res.status(200).json('Message Sent and Logs History Created');
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
});

messagesRouter.get(('/logs'), async (req, res) => {
  try {
    const logs = await prisma.logHistory.findMany({
      include: { User: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(logs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
});

export default messagesRouter;
