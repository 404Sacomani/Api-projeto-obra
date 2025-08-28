import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

//Rota de home
router.get('/', async (req, res) => {

    try {
        const artigoHome = [{ 
    _id: '63fbaea1b4f3b8a9c8d7e6f5', // O MongoDB sempre adiciona um _id único
    titulo: 'Teste 01',
    subtitulo: 'conteudo para teste',
    slug: 'teste-01',
    dataPublicacao: new Date('2025-08-27T18:00:00Z') // Outros campos que seu modelo pode ter
  },
  {
    _id: '63fbaea1b4f3b8a9c8d7e6f6',
    titulo: 'Teste 02',
    subtitulo: 'conteudo para teste',
    slug: 'teste-02',
    dataPublicacao: new Date('2025-08-28T10:00:00Z')
  }
];

// No seu front-end, você usaria o método .map() para renderizar essa lista
artigos.map(artigo => {
  console.log(artigo.titulo);
});


        res.status(200).json(artigoHome);

    } catch (error) {
        console.error('Erro ao buscar artigos resumidos:', error);
        res.status(500).json({ error: 'Erro ao carregar o conteúdo da página inicial.' });
    }
})

export default router
