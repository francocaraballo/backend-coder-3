import express from "express";
import { __dirname } from '../path.js';
import cartsRouter from "./carts.routes.js";
import productsRouter from "./products.routes.js";
import sessionsRouter from "./sessions.routes.js";

const router = express.Router();

router.use('/api/sessions', sessionsRouter);
router.use('/api/products', productsRouter);
router.use('/api/carts', cartsRouter);
router.use('/public', express.static(__dirname + '/public'));

export default router;

