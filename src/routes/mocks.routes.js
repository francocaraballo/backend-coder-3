import { Router } from "express";
import { petsMocks, usersMocks } from '../controllers/mocks.controller.js';
import { writeData } from "../data/data.service.js";

const router = Router();

router.get('/mockingpets', (req, res) => {
    const { quantity = 50 } = req.query;
    const data = petsMocks(quantity);
    res.send(data);
})

router.get('/mockingusers', (req, res) => {
    const { quantity = 50 } = req.query;
    const data = usersMocks(quantity);
    res.send(data)

})

router.post('/generateData', async (req, res) => {
    const { userQty = 10, petsQty = 10 } = req.body;
    try {
        const users = usersMocks(userQty);
        const pets = petsMocks(petsQty);
        writeData({ users, pets });
        res.send('Datos generados correctamente')
    } catch (error) {
        console.log(error);
    }
})

export default router;