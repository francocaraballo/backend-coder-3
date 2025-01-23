import userModel from "../models/user.model.js";

export const login = async (req, res) => {
   try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }) // si no existe devuelve undefined
        
        if(!user) res.status(404).json({ error: "User not found" });
        
        if(user){
            if(password === user.password) {
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
        }
        
   } catch (error) {
       res.status(500).send("Error to login: " + error);
   }
}

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        let message = await userModel.create({ first_name, last_name, email, password, age });
        res.status(201).send("User created: " + message);
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