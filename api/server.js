import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.post('/usuario', async (req, res) => {
    const usuario = await prisma.usuario.create({
        data: {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            idade: req.body.idade
        }
    })
    res.send('Cadastro realizado com sucesso')
})

app.get('/usuarios', async (req, res) => {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios)
})

app.listen(3000)

