import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, 'data.json');

// Leer los datos del archivo
export async function readData() {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo el archivo:', error);
        return [];
    }
}

export async function writeData(data) {
    try {
        await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error escribiendo en el archivo:', error);
    }
}