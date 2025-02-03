import jwt from 'jsonwebtoken';


const PRIVATE_KEY = 'claveQueNadieDebeConocer';
const generateToken = () => {
    /*
    * param1: Objeto a guardar(user en este caso)
    * param2: clave secreta
    * param3: tiempo de vida del token
    */
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
    return token;
}

const user = {
    first_name:"Franco",
    last_name: "2",
    email: "fradasdasnco2@gmail.com",
    password: "$2b$06$bhwsT106/7JHK67jexRF1eDVtPOBxfT51vI/0wytTsyKup8rIJlsq",
    age: 30,
    role:"User"
};

console.log(generateToken(user));