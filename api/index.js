import express from 'express'
import publicRoutes from '../routes/public.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

// Rotas
app.use('/api', publicRoutes)

// Exporta o app para o Vercel
export default app