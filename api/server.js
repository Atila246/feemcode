import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:8080', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'] 
}));

app.post('/usuario', async (req, res) => {
    await prisma.usuario.create({
        data: {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }
    })

    res.send('Cadastro realizado com sucesso')
})

app.get('/usuarios', async (_, res) => {
    const usuarios = await prisma.usuario.findMany()

    res.status(200).json(usuarios)
})

app.post('/postagem', async (req,res) =>{
    await prisma.postagem.create({
        data: {
            titulo: req.body.titulo,
            bio: req.body.bio
        }
    })

    res.send('Postado com sucesso!!')
})

app.post('/login', async(req,res) => {
    console.log("Dados recebidos no login:", req.body)

    const usuario = await prisma.usuario.findUnique({
        where: {
            email: req.body.email,
            senha: req.body.senha
        }
    })

    res.status(200).json(usuario)
})

app.listen(3000)

