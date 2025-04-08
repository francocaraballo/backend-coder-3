import { Router } from "express";
import { petsMocks, usersMocks } from '../controllers/mocks.controller.js'

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

router.post('/generateData', () => {
    console.log('data generada')
})

export default router;