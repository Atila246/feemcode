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


/*Recuperação de senha*/
document.getElementById('verifyForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('emailVerify').value;
    const codigo = document.getElementById('codigo').value;

    try {
        const response = await fetch('http://localhost:3000/verify-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, codigo })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Código verificado com sucesso!');
            showStep(3); // Avança para a Etapa 3
        } else {
            alert(data.message || 'Código inválido.');
        }
    } catch (error) {
        alert('Erro ao verificar o código.');
    }
});
document.getElementById('resetForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('emailReset').value;
    const novaSenha = document.getElementById('nova_senha').value;

    try {
        const response = await fetch('http://localhost:3000/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, novaSenha })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Senha redefinida com sucesso!');
        } else {
            alert(data.message || 'Erro ao redefinir a senha.');
        }
    } catch (error) {
        alert('Erro ao conectar com o servidor.');
    }
});
import express from 'express'
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const app = express();
const port = 3000;

app.use(express.json());

// Exemplo de banco de dados
let users = [
  { id: 1, email: 'usuario@dominio.com', password: 'hashedpassword' }
];

// Função para enviar e-mail
const sendRecoveryEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seuemail@gmail.com',
      pass: 'suasenha'
    }
  });

  const mailOptions = {
    from: 'seuemail@gmail.com',
    to: email,
    subject: 'Código de Recuperação de Senha',
    text: `Use o código a seguir para redefinir sua senha: ${token}`
  };

  await transporter.sendMail(mailOptions);
};

// Rota para solicitar recuperação
app.post('/request-recovery', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  const token = jwt.sign({ email }, 'secreta', { expiresIn: '10m' });

  sendRecoveryEmail(email, token)
    .then(() => res.status(200).json({ message: 'Código enviado!' }))
    .catch(err => res.status(500).json({ message: 'Erro ao enviar o código.' }));
});

// Rota para verificar o código
app.post('/verify-code', (req, res) => {
  const { email, codigo } = req.body;

  try {
    const decoded = jwt.verify(codigo, 'secreta');
    if (decoded.email === email) {
      res.status(200).json({ message: 'Código verificado com sucesso!' });
    } else {
      res.status(400).json({ message: 'Código inválido.' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Código expirado ou inválido.' });
  }
});

// Rota para redefinir a senha
app.post('/reset-password', (req, res) => {
  const { email, novaSenha } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  user.password = bcrypt.hashSync(novaSenha, 10);
  res.status(200).json({ message: 'Senha redefinida com sucesso!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
