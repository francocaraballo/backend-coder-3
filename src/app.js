import express from 'express';
import mocksRouter from './routes/mocks.routes.js'

const app = express();

app.use(express.json());

app.use('/api/mocks', mocksRouter);

app.listen('8080', () => {
    console.log("Server on");
})