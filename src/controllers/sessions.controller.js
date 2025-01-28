import userModel from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";

export const login = async (req, res) => {
   try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }) // si no existe devuelve undefined
        
        if(!user) return res.status(400).json({ error: 'Invalid credentials' });
        const isValidPassword = comparePassword(password, user.password);

        if(user && isValidPassword) {
            req.session.user = {
                email: user.email,
                role: user.role,
                firstName: user.first_name,
                lastName: user.last_name,
                age: user.age
            }
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(400).json({ error: 'Invalid credentials' });
        } 
   } catch (error) {
       res.status(500).send("Error to login: " + error);
   }
}

export const register = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: hashPassword(password)
        }

        let message = await userModel.create( newUser );
        res.status(201).redirect('/api/session/login');
    } catch (error) {
        res.status(500).send("Error to create user: " + error);
    }
}

export const viewRegister = (req, res) => {
    res.status(200).render('templates/register')
}

export const viewLogin = (req, res) => {
    res.status(200).render('templates/login')
}