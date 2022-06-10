import { Router } from 'express';
import { user } from '../Controllers/users.js';

const usersRouter = Router();

usersRouter.get('/users/:id', user);
//usersRouter.get('/ranking');

export default usersRouter;