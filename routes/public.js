import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

//Rota de home
router.get('/', async (req, res) => {

    try {
        const artigoHome = {
  // A chave "Artigos" deve conter um ARRAY de objetos
  Artigos: [
    {
      titulo: 'Teste 01',
      subtitulo: 'conteudo para teste',
      slug: 'teste-01' // Sugestão: usar "slug" no singular para um único artigo
    },
    {
      titulo: 'Teste 02',
      subtitulo: 'conteudo para teste',
      slug: 'teste-02'
    }
    // Você pode adicionar mais objetos de artigo aqui, separados por vírgula
  ]
};

        res.status(200).json(artigoHome);

    } catch (error) {
        console.error('Erro ao buscar artigos resumidos:', error);
        res.status(500).json({ error: 'Erro ao carregar o conteúdo da página inicial.' });
    }
})

export default router
