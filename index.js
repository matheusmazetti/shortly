import express from 'express';
import cors from 'cors';
import signupRouter from './Routers/signup.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use(signupRouter);

app.listen(5000);