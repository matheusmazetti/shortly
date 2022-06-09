import { Router } from 'express';
import { short } from '../Controllers/urls.js';
import { checkShort } from '../Middlewares/urls.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', checkShort, short);
//urlsRouter.get('/urls/:id');
//urlsRouter.delete('/urls/:id')
//urlsRouter.get('/urls/open/:shortUrl');

export default urlsRouter;