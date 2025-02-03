import { Router } from 'express';
import passport from 'passport';
import { login, register, viewLogin, viewRegister, githubLogin } from '../controllers/sessions.controller.js';


const sessionsRouter = Router();

sessionsRouter.get('/login', viewLogin);
sessionsRouter.post('/login', passport.authenticate('login'),login);

sessionsRouter.get('/register', viewRegister);
sessionsRouter.post('/register', passport.authenticate('register') ,register);

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {});
sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), githubLogin);

export default sessionsRouter;
