import { Router } from 'express';
import passport from 'passport';
import { login, register, viewLogin, viewRegister } from '../controllers/sessions.controller.js';


const sessionsRouter = Router();

sessionsRouter.get('/login', viewLogin);
sessionsRouter.post('/login', passport.authenticate('login'),login);

sessionsRouter.get('/register', viewRegister);
sessionsRouter.post('/register', passport.authenticate('register') ,register);

export default sessionsRouter;
