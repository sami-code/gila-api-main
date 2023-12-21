import { Router } from 'express';
import usersRouter from './user.routes';
import messagesRouter from './messages.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/messages', messagesRouter);

export default routes;