import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo'; // Almacena las sesiones en una base de datos de mongo
import passport from 'passport';
import initializePassport from './config/passport.config.js';

import { __dirname, PORT, DB_URL } from './utils.js';

import sessionsRouter from './routes/sessions.routes.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secreto"));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

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
    saveUninitialized: true
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(DB_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log(err));

// ROUTES
app.use('/api/session', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/home', (req, res) => {
    if(req.session.user) {
        res.status(200).send('Welcome to home');
    } else {
        res.status(401).send('Unauthorized');
    }
    
});

app.listen(PORT, () => {
    console.log("first app listening on port " + PORT);
})