import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

//Rota de home
router.get('/', async (req, res) => {

    try {
        const artigoHome = artigo {
titulo:nome,
subtitulo:ola,
slugs:idolobs,
}

        res.status(200).json(artigoHome);

    } catch (error) {
        console.error('Erro ao buscar artigos resumidos:', error);
        res.status(500).json({ error: 'Erro ao carregar o conteúdo da página inicial.' });
    }
})

export default router
