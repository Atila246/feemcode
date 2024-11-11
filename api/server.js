import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

//configurando o cors
app.use(cors({
    origin: 'http://localhost:8080', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'] 
}));

//método para cadastrar usuários
app.post('/usuario', async (req, res) => {
    const usuario = await prisma.usuario.create({
        data: {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        }
    })
    
    res.status(201).json(usuario)
})

//método para buscar vários usuários
app.get('/usuarios', async (_, res) => {
    const usuarios = await prisma.usuario.findMany()
    res.status(200).json(usuarios)
})

//método para fazer uma postagem
app.post('/postagem', async (req,res) =>{

    const conteudo = await prisma.conteudo.create({
        data: {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            qtdLikes: 0
        }
    })

    try{
        const comunidade = await prisma.comunidade.findUnique({
            where: {
                id: req.body.comunidadeId
            }
        })

        if(comunidade==null){
            return res.status(404).json({ error: "Comunidade não encontrada" })
        }

        const usuario = await prisma.usuario.findUnique({
            where: {
                id: req.body.usuarioId
            }
        })

        if(usuario==null){
            return res.status(404).json({ error: "Usuário não encontrado" })
        }

        const postagem = await prisma.postagem.create({
            data: {
                conteudo: {
                    connect: { id: conteudo.id }
                },
                comunidade: {
                    connect: { id: req.body.comunidadeId }
                },
                usuario: {
                    connect: { id: req.body.usuarioId }
                }
            }
        })

        res.status(201).json(postagem)

    }catch(error){
        res.status(500).json({ error: "Erro ao postar na comunidade" })
        await prisma.conteudo.delete({
            where: {
                id: conteudo.id
            }
        })
    }
})

app.get('/postagens', async (req,res) => {
    const postagens = await prisma.postagem.findMany({
        where: {
            conteudo: {
                titulo: {
                    contains: req.body.titulo
                } 
            }
        },

        select: {
            id: true, 

            conteudo: {
                select: {
                    titulo: true,
                    descricao: true,
                    qtdLikes: true,
                }
            },

            comunidade: {
                select: {
                    foto: true,
                    nomeComunidade: true,
                }
            },

            usuario: {
                select: {
                    nome: true,
                }
            }
        }
    })

    res.status(201).json(postagens)
})

app.get('/conteudo', async (req,res) => {
    const conteudos = await prisma.conteudo.findMany({
        where: {
            titulo: {
                contains: req.body.titulo
            }
        }
    })
    res.json(conteudos)
})

app.get('/postagens_pesquisa', async (req,res) => {

    const postagens = await prisma.postagem.findMany({
        where: {
            conteudo: {
                titulo: {
                    contains: req.body.titulo
                } 
            }
        },

        select: {
            id: true, 

            conteudo: {
                select: {
                    titulo: true,
                    descricao: true,
                    qtdLikes: true,
                }
            },

            comunidade: {
                select: {
                    foto: true,
                    nomeComunidade: true,
                }
            },

            usuario: {
                select: {
                    nome: true,
                }
            }
        }
    })

    res.status(200).json(postagens)
})

app.post('/comunidade', async (req,res) =>{
    try{
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: req.body.usuarioId
            }
        })

        if(usuario==null){
            return res.status(404).json({ error: "Usuário não encotrando" })
        }

        const comunidade = await prisma.comunidade.create({
            data:{
                foto: req.body.foto,
                nomeComunidade: req.body.nomeComunidade,
                bio: req.body.bio,
                usuario: {
                    connect: { id: req.body.usuarioId }
                }
            }
        })
    
        res.status(201).json(comunidade)

    }catch(error){
        res.status(500).json({ error: "Erro ao criar comunidade" })
    }
})

app.post('/moderador', async (req,res) => {
    try{
        const usuario = await prisma.usuario.create({
            data: {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            }
        })

        const moderador = await prisma.moderador.create({
            data: {
                usuario: {
                    connect: { id: usuario.id }
                }
            }
        })

        res.status(201).json(moderador)

    }catch(error){
        res.status(500).json({ error: "Erro ao criar moderador" })
    }
})

app.post('/canal', async (req,res) => {
    try{
        const moderador = await prisma.findUnique({
            where: {
                id: req.body.moderadorId
            }
        })

        if(moderador==null){
            return res.send({ err: "Moderador não encontrado" })
        }

        const canal = await prisma.canal.create({
            data: {
                nomeCanal: req.body.nomeCanal,
                qtdInscritos: 0,
                moderador: {
                    connect: { id: req.body.moderadorId }
                }
            }
        })

        res.status(201).json(canal)

    }catch(error){
        res.status(500).json({ error: "Erro ao criar canal" })
    }
})

//método para fazer login
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

