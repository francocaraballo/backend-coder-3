import { Router } from 'express';


const sessionRouter = Router();

sessionRouter.post('/login')
sessionRouter.post('/register')

export default sessionRouter;
