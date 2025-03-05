import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'secreto'; // tiene que ser la misma key que se usa en passport
export const generateToken = ( user ) => {
    /*
    * param1: Objeto a guardar(user en este caso)
    * param2: clave secreta
    * param3: tiempo de vida del token
    */
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
    return token;
}

