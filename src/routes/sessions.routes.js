import { Router } from 'express';
import { login, register, viewLogin, viewRegister } from '../controllers/sessions.controller.js';


const sessionsRouter = Router();

sessionsRouter.get('/login', viewLogin);
sessionsRouter.post('/login', login);

sessionsRouter.get('/register', viewRegister);
sessionsRouter.post('/register', register);

export default sessionsRouter;
