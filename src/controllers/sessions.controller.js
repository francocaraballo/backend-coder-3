import { generateToken } from '../utils/jwt.js';

export const login = async ( req, res ) => {
    try {
        if(!req.user) return res.status(401).json({ error: 'Invalid credentials' });
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
        }
        const token = generateToken(req.user);
        res.cookie('jwt', token, {
            httpOnly: true, 
            secure: false,
            magAge: 1000 * 60 * 60 * 24 // 24 horas
        });
        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
       res.status(500).send("Error to login: " + error);
    }
}

export const register = async ( req, res ) => {
    try {
        if(!req.user) {
            // Si no hay usuario, verifica si hay un mensaje de error en req.authInfo
            const errorMessage = req.authInfo?.message || 'Authentication failed';
            return res.status(400).json({ error: "User already exists" });
        }
        
        return res.status(201).json({ message: 'User created successful' }); 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error to register: ' + error.message });
    }
}

export const githubLogin = ( req, res ) => {
    try {
        if(!req.user) return res.status(401).json({ error: 'Invalid credentials' });
        
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
        }
        return res.status(200).redirect('/home');
    } catch (e) {
        console.log(e)
        res.status(500).send("Error to login: " + e);
    }
}

export const viewRegister = ( req, res ) => {
    res.status(200).render('templates/register')
}

export const viewLogin = ( req, res ) => {
    res.status(200).render('templates/login')
}