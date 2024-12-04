import express, { response } from 'express'
import multer from 'multer'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

//configurando o cors
app.use(cors({
    origin: 'http://localhost:8080', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
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

    const resposta = {
        nome: usuario.nome,
        nomeUsuario: usuario.nomeUsuario,
        email: usuario.email,
        moderador: false
    }

    res.status(201).json(resposta)
})

app.post('/moderador', async (req, res) => {
    try{
        const usuario = await prisma.usuario.create({
            data: {
                nome: req.body.nome,
                nomeUsuario: req.body.nomeUsuario,
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

        if(moderador){
            const resposta = {
                nome: usuario.nome,
                nomeUsuario: usuario.nomeUsuario,
                email: usuario.email,
                moderador: true
            }
            res.status(201).json(resposta)
        }
    
    }catch(error){
        res.status(500).json({ message: 'Erro ao tentar cadastrar moderador', error })
    }

})

app.post('/um-usuario', async (req,res) =>{
    try{
        const usuario = await prisma.usuario.findUnique({
            where: {
                nomeUsuario: req.body.nomeUsuario
            }
        })
    
        const moderador = await prisma.moderador.findUnique({
            where: { usuarioId: usuario.id }
        })

        if (!usuario) {
            return res.status(404).send({ message: 'Usuário não encontrado' })
        }

        let resposta = {
            nome: usuario.nome,
            nomeUsuario: usuario.nomeUsuario,
            email: usuario.email,
            moderador: false
        }
        
        if(moderador){
            resposta.moderador = true
        }
        res.status(200).json(resposta)
    }catch(error){
        res.status(500).send({ message: 'Erro ao buscar informações do usuário' })
        console.log(error)
    }
})

app.post('/login', async(req,res) => {
    try{
        const usuario = await prisma.usuario.findUnique({
            where: {
                email: req.body.email,
                senha: req.body.senha
            }
        })
    
        const moderador = await prisma.moderador.findUnique({
            where: {
                usuarioId: usuario.id
            }
        })
    
        let resposta = {
            nome: usuario.nome,
            nomeUsuario: usuario.nomeUsuario,
            email: usuario.email,
            moderador: false
        }
        
        if(moderador){
            resposta.moderador = true
        }
        res.status(200).json(resposta)

    }catch(error){
        res.status(500).send({ message: 'Erro ao fazer login' })
        console.log(error)
    }
    
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

        const participante = await prisma.participante.create({
            data: {
                usuario: {
                    connect: { id: usuario.id }
                }
            }
        })

        if(!participante){
            return res.status(404).json({ error: "Participante não existe" })
        }

        const participanteInComunidade = await prisma.participante.findUnique({
            where: { id: participante.id },
            include: {
                comunidades: {
                    where: { id: comunidade.id }
                }
            }
        })

        if(!participanteInComunidade){
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
        console.log(error)

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

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/')
    },
    filename: (req,file,cb) => {
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

app.post('/comunidade', upload.single('photo'), async (req,res) =>{
    try{
        const usuario = await prisma.usuario.findUnique({
            where: {
                nomeUsuario: req.body.nomeUsuario
            }
        })

        if(!usuario){
            return res.status(404).json({ error: "Usuário não encontrado" })
        }

        const criador = await prisma.criador.create({
            data: {
                usuario: {
                    connect: { id: usuario.id}
                }
            }
        })

        const comunidade = await prisma.comunidade.create({
            data: {
                foto: req.body.foto,
                nomeComunidade: req.body.nomeComunidade,
                bio: req.body.bio,
                criador: {
                    connect: { id: criador.id }
                }
            }
        })
        res.status(201).json(comunidade) 
    }catch(error){
        res.status(500).json({ error: "Erro ao criar comunidade" + error })
        console.log(error)  
    }
})

app.get('/usuario-in-comunidade', async (req,res) => {
    try{
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

        const participante = await prisma.participante.create({
            data: {
                usuario: {
                    connect: { id: usuario.id }
                }
            }
        })

        if(!participante){
            return res.status(404).json({ error: "Participante não existe" })
        }

        const participanteInComunidade = await prisma.participante.findUnique({
            where: { id: participante.id },
            include: {
                comunidades: {
                    where: { id: comunidade.id }
                }
            }
        })

        if(!participanteInComunidade){
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }
        res.send(true)
    }catch(error){
        res.status(500).json({ error: "Erro verificar se usuário está na comunidade" + error })
        console.log(error)  
    }
})

app.post('/entrar-comunidade', async (req,res) => {
    try{

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

        const isParticipante = await prisma.participante.findUnique({
            where: {
                usuarioId: usuario.id
            }
        })

        if(isParticipante){
            res.status(200).send("Usuário já está na comunidade")
        }

        const participante = await prisma.participante.create({
            data: {
                usuario: {
                    connect: { id: usuario.id }
                }
            }
        })

        const update = await prisma.participante.update({
            where: { id: participante.id },
            data: {
                comunidades: {
                      connect: { id: comunidade.id }
                }
            }
        })
        res.status(201).json(comunidade)
    }catch(error){
        res.status(500).json({ error: "Erro ao entrar na comunidade" })
        console.log(error)
    }
})

app.get('/comunidades', async (req,res) => {
    try{
        const comunidades = await prisma.comunidade.findMany()
        let list_item = []

        for(const item of comunidades) {
            let criador = await prisma.criador.findUnique({
                where: {
                    id: item.criadorId
                }
            })

            let usuario = await prisma.usuario.findUnique({
                where: {
                    id: criador.usuarioId
                }
            })

            let comunidade = {
                id: item.id,
                foto: item.foto,
                nomeComunidade: item.nomeComunidade,
                bio: item.bio,
                criador: {
                    nome: usuario.nome,
                    nomeUsuario: usuario.nomeUsuario,
                    email: usuario.email
                }
            }

            list_item.push(comunidade)
        }
        res.status(200).json(list_item)
    }catch(error){
        res.status(500).json({ error: "Não foi possível encontrar as comunidades "})
        console.log(error)
    }
})

app.post('/uma-comunidade', async (req,res) => {
    const obj = await prisma.comunidade.findUnique({
        where: {
            id: req.body.id
        }
    })
    res.json(obj)
})

app.get('/canais', async (req,res) => {
    try{
        const canais = await prisma.canal.findMany()
        let list_item = []

        for(const item of canais) {
            let moderador = await prisma.criador.findUnique({
                where: {
                    id: item.moderadorId
                }
            })

            let usuario = await prisma.usuario.findUnique({
                where: {
                    id: moderador.usuarioId
                }
            })

            let canal = {
                foto: item.foto,
                nomeCanal: item.nomeCanal,
                descricao: item.descricao,
                moderador: {
                    nome: usuario.nome,
                    nomeUsuario: usuario.nomeUsuario,
                    email: usuario.email
                }
            }

            list_item.push(canal)
        }
        res.status(200).json(list_item)
    }catch(error){
        res.status(500).json({ error: "Não foi possível encontrar os canais "})
        console.log(error)
    }
})


app.post('/canal', async (req,res) => {
    try{
        const usuario = await prisma.usuario.findUnique({
            where: {
                nomeUsuario: req.body.nomeUsuario
            }
        })

        if(!usuario){
            return res.send({ err: "Usuário não encontrado" })
        }

        const moderador = await prisma.moderador.findUnique({
            where: { usuarioId: usuario.id }
        })

        if(!moderador){
            return res.send({ err: "Moderador não encontrado" })
        }

        const canal = await prisma.canal.create({
            data: {
                foto: req.body.foto,
                nomeCanal: req.body.nomeCanal,
                qtdInscritos: 0,
                descricao: req.body.descricao,
                moderador: {
                    connect: { id: moderador.id }
                }
            }
        })

        res.status(201).json(canal)
    }catch(error){
        res.status(500).json({ error: "Erro ao criar canal" })
        console.log(error)
    }
})

app.post('/evento', async (req,res) => {
    try{
        const usuario = await prisma.usuario.findUnique({
            where: {
                nomeUsuario: req.body.nomeUsuario
            }
        })

        if(!usuario){
            return res.send({ err: "Usuário não encontrado" })
        }

        const moderador = await prisma.moderador.findUnique({
            where: { usuarioId: usuario.id }
        })

        if(!moderador){
            return res.send({ err: "Moderador não encontrado" })
        }

        const conteudo = await prisma.conteudo.create({
            data: {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                qtdLikes: 0
            }
        })

        console.log(conteudo)

        const evento = await prisma.evento.create({
            data: {
                conteudo: {
                    connect: { id: conteudo.id }
                },
                moderador: {
                    connect: { id: moderador. id}
                },
                imagem: req.body.imagem,
                data: req.body.data,
                horario: req.body.horario,
                local: req.body.local
            }
        })
        res.status(201).json(evento)

    }catch(error){
        res.status(500).json({ error: "Erro ao criar evento" })
        console.log(error)
    }
})

app.get('/eventos', async (req,res) => {
    try{
        const eventos = await prisma.evento.findMany()
        let list_item = []

        for(const item of eventos) {
            let moderador = await prisma.moderador.findUnique({
                where: {
                    id: item.moderadorId
                }
            })

            let usuario = await prisma.usuario.findUnique({
                where: {
                    id: moderador.usuarioId
                }
            })

            let conteudo = await prisma.conteudo.findUnique({
                where: {
                    id: item.conteudoId
                }
            })

            let evento = {
                imagem: item.imagem,
                conteudo: {
                    titulo: conteudo.titulo,
                    descricao: conteudo.descricao
                },
                data: item.data,
                horario: item.horario,
                local: item.local,
                moderador: {
                    nome: usuario.nome,
                    nomeUsuario: usuario.nomeUsuario,
                    email: usuario.email
                }
            }

            list_item.push(evento)
        }
        res.status(200).json(list_item)
    }catch(error){
        res.status(500).json({ error: "Não foi possível encontrar os canais "})
        console.log(error)
    }
})
//método para fazer login


app.listen(3000)


/*Recuperação de senha*/
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connect } from 'http2'

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
  })

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  const token = gerarCodigo(6)

  try {
    await sendRecoveryEmail(email, token);
    return res.status(200).json({ message: 'Código enviado!' });
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao enviar o código.'+err });
  }
})

function gerarCodigo(tamanho) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let codigo = ''
    for (let i = 0; i < tamanho; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length)
        codigo += caracteres[randomIndex]
    }
    return codigo
}

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

// Rota de login (para garantir que o login funcione)
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

