import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import publicRoutes from './routes/public.js';
import privateRoutes from './routes/private.js';
import cors from 'cors';
import auth from './middlewares/auth.js';

const app = express();
const port = 8080

app.use(express.json())
app.use(cors({
  exposedHeaders: ['x-total-count']
}));

app.use('/', publicRoutes)

app.use('/', auth, privateRoutes)



app.listen(port, () => console.log('Servidor rodando.'))   