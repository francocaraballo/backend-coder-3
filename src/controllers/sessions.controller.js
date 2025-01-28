import userModel from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";

export const login = async (req, res) => {
    try {
        if(!req.user) return res.status(401).json({ error: 'Invalid credentials' });
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
        }

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
       res.status(500).send("Error to login: " + error);
    }
}

export const register = async (req, res) => {
    try {
        if(!req.user) res.status(400).json({ error: 'User already exists' }); // Porque el passport devuelve false si el usuario ya esta registrado con ese mail
        else res.status(201).json({ message: 'User created' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error to register: ' + error });
    }
}

export const viewRegister = (req, res) => {
    res.status(200).render('templates/register')
}

export const viewLogin = (req, res) => {
    res.status(200).render('templates/login')
}