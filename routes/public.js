import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()
const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET
//Rota de home
router.get('/homeBlog', async (req, res) => {

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

router.get('/blog', async (req, res) => {
    const { _start, _limit } = req.query;

    try {
        const artigos = await prisma.artigo.findMany({
            skip: Number(_start) || 0,
            take: Number(_limit) || 9,
            orderBy: {
                dataPublic: 'desc',
            },
        });

        const totalArtigos = await prisma.artigo.count();

        res.set('x-total-count', totalArtigos);
        res.status(200).json(artigos);
    } catch (error) {
        console.error('Erro ao buscar artigos:', error);
        res.status(500).json({ error: 'Erro ao carregar a página de artigos.' });
    }
});

// Rota para um único artigo por slug
router.get('/blog/:slug', async (req, res) => {
    const { slug } = req.params;

    try {
        const artigo = await prisma.artigo.findUnique({
            where: {
                slugs: slug,
            },
            include: {
                autor: true,
            },
        });

        if (!artigo) {
            return res.status(404).json({ error: 'Artigo não encontrado.' });
        }

        res.status(200).json(artigo);
    } catch (error) {
        console.error('Erro ao buscar artigo:', error);
        res.status(500).json({ error: 'Erro ao carregar o artigo.' });
    }
});

router.post("/admin/login", async (req, res) => {
    try {
        const userInfo = req.body

        const userLog = await prisma.user.findUnique({
            where: {
                email: userInfo.email
            },
        })

        if (!userLog) { return res.status(404).json({ message: 'Usuario não encontrado' }) }

        const isMatch = await bcrypt.compare(userInfo.password, userLog.password)

        if(!isMatch){return res.status(400).json({message: 'Senha invalida'})}
        
        const token = jwt.sign({id: userLog.id, name: userLog.name, userName: userLog.userName}, JWT_SECRET, {expiresIn: '7d'})

        res.status(201).json(token)

    } catch (error) {
        console.error('Erro ao logar usuario:', error);
        res.status(500).json({ message: 'Erro no servidor, tente novamente' })
    }
})

router.post('/admin/cadastro', async (req, res) => {
    try {

        const userCas = req.body
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(userCas.password, salt)

        const userDB = await prisma.user.create({
            data: {
                name: userCas.name,
                email: userCas.email,
                userName: userCas.userName,
                password: hashPassword,
            },
        })
        res.status(201).json(userDB)
    } catch (error) {
        console.error('Erro ao cadastrar usuario:', error);
        res.status(500).json({ message: 'Erro no servidor, tente novamente' })
    }
})


export default router
