import { Router } from 'express';
import { signup } from '../Controllers/signup.js';
import { checkSignup } from '../Middlewares/signup.js';

const signupRouter = Router();

signupRouter.post('/signup', checkSignup, signup);

export default signupRouter;