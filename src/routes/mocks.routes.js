import { Router } from "express";
import { petsMocks, usersMocks } from '../controllers/mocks.controller.js';
import { writeData } from "../data/data.service.js";

const router = Router();

router.get('/mockingpets', (req, res) => {
    const { quantity = 50 } = req.query;
    const data = petsMocks(quantity);
    res.send(data);
})

router.get('/mockingusers', async (req, res) => {
    const { quantity = 50 } = req.query;
    const data = await usersMocks(quantity);
    res.send(data)

})

router.post('/generateData', async (req, res) => {
    try {
        const users = await usersMocks();
        const pets = petsMocks();
    } catch (error) {
        console.log(error);
    }
})

export default router;