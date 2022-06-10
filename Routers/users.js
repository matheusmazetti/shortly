import { Router } from 'express';
import { ranking, user } from '../Controllers/users.js';

const usersRouter = Router();

usersRouter.get('/users/:id', user);
usersRouter.get('/ranking', ranking);

export default usersRouter;