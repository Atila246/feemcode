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
            nomeUsuario: req.body.nomeUsuario,
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
    try{
        const conteudo = await prisma.conteudo.create({
            data: {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                qtdLikes: 0
            }
        })
    
        const comunidade = await prisma.comunidade.findUnique({
            where: {
                nomeComunidade: req.body.nomeComunidade
            }
        })
    
        const usuario = await prisma.usuario.findUnique({
            where: {
                nomeUsuario: req.body.nomeUsuario
            }
        })
    
        if(!usuario || !comunidade){
            return res.status(404).json({ error: "Comunidade ou Usuário não encontrado" })
        }

        const usuarioInComunidade = await prisma.usuario.findUnique({
            where: { id: usuario.id },
            include: {
                comunidades: {
                    where: { id: comunidade.id }
                }
            }
        })

        if(!usuarioInComunidade){
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        const postagem = await prisma.postagem.create({
            data: {
                conteudo: {
                    connect: { id: conteudo.id }
                },
                comunidade: {
                    connect: { id: comunidade.id }
                },
                usuario: {
                    connect: { id: usuario.id }
                }
            }
        })

        res.status(201).json(postagem)

    }catch(error){
        res.status(500).json({ message: 'Erro ao tentar postar na comunidade', error })

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
                    nomeUsuario: true
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
        const comunidade = await prisma.comunidade.create({
            data:{
                foto: req.body.foto,
                nomeComunidade: req.body.nomeComunidade,
                bio: req.body.bio
            }
        })
        res.status(201).json(comunidade)

    }catch(error){
        res.status(500).json({ error: "Erro ao criar comunidade" })
    }
})

app.post('/entrar-comunidade', async (req,res) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            nomeUsuario: req.body.nomeUsuario
        }
    })

    const comunidade = await prisma.comunidade.findUnique({
        where: {
            nomeComunidade: req.body.nomeComunidade
        }
    })

    if(!usuario || !comunidade){
        return res.status(404).json({ error: "Usuário ou Comunidade não encotrado" })
    }

    try{
        const update = await prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                comunidades: {
                    connect: { id: comunidade.id }
                }
            }
        })
        res.status(201).json(update)

    }catch(error){
        res.status(500).json({ error: "Erro ao criar comunidade" })
    }
})

app.get('/comunidades', async (req,res) => {
    const comunidades = await prisma.comunidade.findMany()
    res.json(comunidades)
})

app.post('/uma-comunidade', async (req,res) => {
    const obj = await prisma.comunidade.findUnique({
        where: {
            nomeComunidade: req.body.nomeComunidade
        }
    })
    res.json(obj)
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
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Função para enviar e-mail
const sendRecoveryEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'femmcode44@gmail.com',
      pass: 'tkmp fjcn rnkg ujcc'
    }
  });

  const mailOptions = {
    from: 'femmcode2024@gmail.com',
    to: email,
    subject: 'Código de Recuperação de Senha',
    text: `Use o código a seguir para redefinir sua senha: ${token}`
  };

  await transporter.sendMail(mailOptions);
};

// Rota para solicitar recuperação de senha
app.post('/request-recovery', async (req, res) => {
  const { email } = req.body;
  const user = await prisma.usuario.findUnique({
    where: { email }
  });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  const token = jwt.sign({ email }, 'secreta', { expiresIn: '10m' });

  try {
    await sendRecoveryEmail(email, token);
    return res.status(200).json({ message: 'Código enviado!' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao enviar o código.'+err });
  }
});

// Rota para verificar o código de recuperação
app.post('/verify-code', async (req, res) => {
  const { email, codigo } = req.body;

  try {
    const decoded = jwt.verify(codigo, 'secreta');
    if (decoded.email === email) {
      return res.status(200).json({ message: 'Código verificado com sucesso!' });
    } else {
      return res.status(400).json({ message: 'Código inválido.' });
    }
  } catch (err) {
    return res.status(400).json({ message: 'Código expirado ou inválido.' });
  }
});

// Rota para redefinir a senha
app.post('/reset-password', async (req, res) => {
  const { email, novaSenha } = req.body;

  const user = await prisma.usuario.findUnique({
    where: { email }
  });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  const hashedPassword = bcrypt.hashSync(novaSenha, 10);

  await prisma.usuario.update({
    where: { email },
    data: { senha: hashedPassword }
  });

  return res.status(200).json({ message: 'Senha redefinida com sucesso!' });
});

// Rota de login (para garantir que o login funciona)
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const user = await prisma.usuario.findUnique({
    where: { email }
  });

  if (!user || !bcrypt.compareSync(senha, user.senha)) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  res.status(200).json({ message: 'Login realizado com sucesso!', user });
});

// Rota para listar usuários
app.get('/usuarios', async (_, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.status(200).json(usuarios);
});

