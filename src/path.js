import { fileURLToPath } from 'url';
import path from 'path';

// Obtenemos la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
// Obtenemos la ruta del directorio actual
export const __dirname = path.dirname(__filename); // Exportamos la constante __dirname

