import { fileURLToPath } from 'url';
import path from 'path';

import dotenv from 'dotenv';

// Obtenemos la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
// Obtenemos la ruta del directorio actual
export const __dirname = path.dirname(__filename); // Exportamos la constante __dirname

dotenv.config(); // Cargamos las variables de entorno
export const PORT = process.env.PORT || 3000;
export const DB_URL = process.env.DB_URL || null ;