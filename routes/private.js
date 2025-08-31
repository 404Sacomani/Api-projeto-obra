import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/admin/painel-controle', async (req, res) => {
    try {
        const artigosPainel = await prisma.artigo.findMany();

        res.status(200).json(artigosPainel);

    } catch (error) {
        console.error('Erro ao buscar a pagina:', error);
        res.status(500).json({ error: 'Erro ao carregar o conteúdo da página inicial.' });
    }
})

router.post('/admin/artigocreate', async (req, res) => {
    try {
        const dataPost = req.body;

        // 1. Verificação de dados recebidos
        if (!dataPost || !dataPost.titulo || !dataPost.conteudo) {
            return res.status(400).json({ message: 'Dados do artigo incompletos. Título e conteúdo são obrigatórios.' });
        }

        // 2. Corrigir o campo 'status'
        const status = dataPost.status || 'rascunho'; // 'status' veio como 'staus' no seu código original

        // 3. Corrigir o campo 'autorId'
        // 'autorId' não deve ser uma string literal, mas sim o valor real do corpo da requisição
        const autorId = dataPost.autorId;
        if (!autorId) {
            return res.status(400).json({ message: 'ID do autor é obrigatório.' });
        }

        const DB = await prisma.artigo.create({
            data: {
                titulo: dataPost.titulo,
                subtitulo: dataPost.subtitulo,
                resumo: dataPost.resumo,
                conteudo: dataPost.conteudo,
                tags: dataPost.tags,
                slugs: dataPost.slugs,
                status: status, 
                autorId: autorId,
                imagemCapa: dataPost.imagemCapa,
                altCapa: dataPost.altCapa,
            }
        });

        // 4. Corrigir a resposta de sucesso
        res.status(201).json(DB); // Use status 201 para "Created" (Criado)

    } catch (error) {
        console.error('Erro ao cadastrar Publicação:', error);
        // 5. Tratamento de erro aprimorado
        res.status(500).json({ message: 'Erro interno no servidor. Por favor, tente novamente mais tarde.' });
    }
});
export default router