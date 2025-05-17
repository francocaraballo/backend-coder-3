import { Router } from 'express';
import passport from 'passport';
import { login, register, viewLogin, viewRegister, githubLogin } from '../controllers/sessions.controller.js';
import { passportCall } from '../config/passport.config.js';
import { authorization } from '../middlewares/authorization.js';
import { loggerSessions } from '../utils/logger.js';

const sessionsRouter = Router();

sessionsRouter.get('/login', viewLogin);
sessionsRouter.post('/login', passport.authenticate('login'), login, loggerSessions );

sessionsRouter.get('/register', viewRegister);
sessionsRouter.post('/register', passportCall('register'), register);

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {});
sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), githubLogin);

sessionsRouter.post('/current', passportCall('jwt'), authorization('user'), (req, res) => res.send(req.user));

export default sessionsRouter;
