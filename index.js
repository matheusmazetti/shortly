import express from 'express';
import cors from 'cors';

import signupRouter from './Routers/signup.js';
import signinRouter from './Routers/singin.js';
import urlsRouter from './Routers/urls.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use(signupRouter);
app.use(signinRouter);
app.use(urlsRouter);

app.listen(5000);