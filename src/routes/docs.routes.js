import { Router } from "express";
import { __dirname } from "../path.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const router = Router();

const swaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info:{
            title: 'Adopme api',
            description: 'nuestra primera documentacion practicando con swagger'
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
};
const specs = swaggerJsDoc(swaggerOptions);

router.use('/v1', swaggerUi.serve);
router.get('/v1', swaggerUi.setup(specs));

export default router;