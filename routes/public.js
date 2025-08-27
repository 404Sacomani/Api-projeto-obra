import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

//Rota de home
router.get('/api', async (req, res) => {

    try {
        const artigoHome = await prisma.artigo.findMany({
            select: {
                titulo: true,
                slugs: true,
                dataPublic: true,
                tags: true,
                imagemCapa: true,
                subtitulo: true
            },
            orderBy: {
                dataPublic: 'desc'
            },
            take: 5
        });

        res.status(200).json(artigoHome);

    } catch (error) {
        console.error('Erro ao buscar artigos resumidos:', error);
        res.status(500).json({ error: 'Erro ao carregar o conteúdo da página inicial.' });
    }
})

export default router