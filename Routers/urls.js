import { Router } from 'express';
import { deleteShort, getShort, openShort, short } from '../Controllers/urls.js';
import { checkShort } from '../Middlewares/urls.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', checkShort, short);
urlsRouter.get('/urls/:id', getShort);
urlsRouter.delete('/urls/:id', deleteShort);
urlsRouter.get('/urls/open/:shortUrl', openShort);

export default urlsRouter;