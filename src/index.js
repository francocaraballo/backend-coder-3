import express from 'express';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import { __dirname, PORT, DB_URL } from './utils.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import FileStore from 'session-file-store'; // Almacena las sesiones en un archivo en forma local

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
        ttl: 15, 
    }), // Almacena las sesiones en una base de datos de mongo
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));

const auth = (req, res, next) => {
    if(req.session && req.session.user === 'franco' && req.session.admin) return next();
    else return res.status(401).send('No autorizado');
}

app.get('/', (req, res) => {
    console.log(req)
    res.render('home');
    
});

app.post('/setCookie', (req, res) => {
    const { name, email } = req.body
    res.cookie('user', JSON.stringify({name, email}), {maxAge: 10000}).json('User cookie set');
})

app.get('/getCookie', (req, res) => {
    const cookie = req.cookies.user;
    res.json(JSON.parse(cookie));
});

app.get('/setCookieSigned', (req, res) => {
    res.cookie('cookieTestSigned', 'Cookie firmada', {signed: true}).send('Cookie firmada');
});
 
app.get('/getCookieSigned', (req, res) => {
    res.send(req.signedCookies);
});

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('cookieTest').send('Cookie eliminada');
}); // Si la cookie ya fue borrada o expiro, el clearCookie procede a ignorarlo

app.get('/session', (req, res) => {
    req.session.count = req.session.count ? req.session.count + 1 : 1;
    req.session.count === 1 
        ? res.send('Bienvenido por primera vez') 
        : res.send(`Bienvenido por ${req.session.count} vez`);
});

app.get('/login', (req, res) => {
    const { username, password } = req.body;
    if(username !== 'franco' || password !== 'franco') res.send('Usuario o contraseña incorrectos');
    req.session.user = username;
    req.session.admin = true;
    res.send('Sesion iniciada');
})

app.get('/privado', auth, (req, res) => {
    res.send('Bienvenido a la zona privada');
})

// para eliminar datos de una variable de session, se utiliza
// el parametro de quest y el metodo destroy. 
// Como parametro se pasa un callback
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (!err) res.send('Sesion eliminada');
        else res.send('Error al eliminar sesion');
    });
});

app.listen(PORT, () => {
    console.log("first app listening on port " + PORT);
})