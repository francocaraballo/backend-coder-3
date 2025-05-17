import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo'; // Almacena las sesiones en una base de datos de mongo
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cors from 'cors';
import { addLoggerHttp, logger } from './utils/logger.js';

import { PORT, DB_URL } from './config/config.js';
import { __dirname } from './path.js';

import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secreto"));
app.use(addLoggerHttp)

app.use(session({
    // path => ruta donde se almacenaran las sesiones
    // ttl => tiempo de vida de la sesion
    // retries => numero de intentos para guardar la sesion
    // store: new fileStorage({ path: __dirname + '/sessions', ttl: 60, retries: 1 }), // Almacena las sesiones en un archivo
    store: MongoStore.create({
        mongoUrl: DB_URL,
        mongoOptions: { }, // opciones de conexion a mongo
        ttl: 60, 
    }), // Almacena las sesiones en una base de datos de mongo
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
}));

mongoose.connect(DB_URL)
.then(() => console.log('Database connected'))
.catch((error) => {
    logger.error({ message: "Error to conect DB", error});
    process.exit(1);
});

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// main router
app.use('/', indexRoutes);

app.get('/home', (req, res) => {
    if(req.session.user) {
        res.status(200).send('Welcome to home');
    } else {
        res.status(401).send('Unauthorized');
        logger.warning({ message: "User not authenticated"})
    }
    
});

app.listen(PORT, () => {
    console.log("App listening on port " + PORT);
})