import express from 'express';
import publicRoutes from '../routes/public.js'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());

// A rota base agora é /
app.use('/api', publicRoutes);

export default app;