import express from 'express';
import cors from 'cors';
import signupRouter from './Routers/signup.js';
import signinRouter from './Routers/singin.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use(signupRouter);
app.use(signinRouter);

app.listen(5000);