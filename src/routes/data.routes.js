import { Router } from 'express';
import { readData } from '../data/data.service.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const data = readData();
        res.send(data);
    } catch(error) {
        console.log(error)
    }

})

export default router;