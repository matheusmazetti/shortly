import { Router } from 'express';
import { signin } from '../Controllers/signin.js';
import { checkSignin } from '../Middlewares/signin.js';

const signinRouter = Router();

signinRouter.post('/signin', checkSignin, signin);

export default signinRouter;