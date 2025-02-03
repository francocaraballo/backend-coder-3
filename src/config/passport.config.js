import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { CALLBACK_URL, CLIENT_ID, CLIENT_SECRET } from '../utils.js';

const LocalStrategy = local.Strategy; // Defino la estrategia local

const initializePassport = () => {
    //Nota que passport utiliza sus propios "middlewares" de acuerdo a cada estrategia
    //Inicializamos la estrategia local
    /*
    * usernameField: 'email' => campo que se usara para el login, en este caso el email
    * done => callback que se ejecuta al finalizar la autenticacion, el primer argumento es el error,
    *         el segundo es el usuario
    */
    passport.use('register', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    // passReqToCallback: true => permite pasar el request como primer argumento
    async( req, username, password, done) => {
        try {
            const { first_name, last_name, email, age } = req.body;
            const userFind = await userModel.findOne({ email: username });
            if( userFind ) {
                console.log('User already exists');
                return done(null, false);
            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: hashPassword(password)
            };

            let user = await userModel.create(newUser);
            return done(null, user);
        } catch (error) { 
            done("Error creating user: " + error);
        }
    }))

    passport.use('login', new LocalStrategy(
    { usernameField: 'email' },
    async(username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });
            const isValidPassword = comparePassword(password, user.password);
            if(user && isValidPassword) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            done("Error login: " + error);
        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({ email: profile._json.email });
            if(!user) {
                const newUser = {
                    first_name: profile._json.name,
                    last_name: ' ', // No se puede obtener el apellido ni la edad
                    age: 18, // Entonces hay que rellenar estos valores
                    email: profile._json.email,
                    password: '1234'
                }
                const result = await userModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (e) {
            console.log(e);
            return done(e);
        }
    }))
    // Pasos necesarios para trabajar via HTTP
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
            const user = await userModel.findById(id);
            done(null, user);
    })
}

export default initializePassport;