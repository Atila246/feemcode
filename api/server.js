import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.post('/usuario', async (req, res) => {
    await prisma.usuario.create({
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
    res.set(
        'Access-Control-Allow-Origin',
        'http://pagina.com'
    );
    res.status(200).json(usuarios)
})

app.post('/postagem', async (req,res) =>{
    await prisma.postagem.create({
        data: {
            titulo: req.body.titulo,
            bio: req.body.bio
        }
    })
    res.send('Postado com sucesso!!!!!!!!!!!!')
})

app.listen(3000)

