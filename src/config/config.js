import dotenv from 'dotenv';

dotenv.config(); // Cargamos las variables de entorno
export const { PORT = 3000, DB_URL, CLIENT_SECRET, CLIENT_ID, CALLBACK_URL } = process.env;
