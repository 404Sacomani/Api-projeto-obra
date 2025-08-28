import express from 'express';
import publicRoutes from './routes/public.js'
import cors from 'cors'

const app = express();
const port = 8080

app.use(express.json())
app.use(cors())
app.use('/', publicRoutes)

app.listen(port, () => console.log('Servidor rodando.'))