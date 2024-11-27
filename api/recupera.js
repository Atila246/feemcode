const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Middleware para interpretar JSON no corpo da requisição
app.use(bodyParser.json());

// Variáveis globais
let verificationCode = ''; // Variável para armazenar o código de recuperação

// Rota para solicitar o envio do código de recuperação
app.post('/request-recovery', (req, res) => {
    const { email } = req.body;

    // Gerar um código aleatório de 6 dígitos
    verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Configuração do transporter do Nodemailer para enviar e-mail
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Ou qualquer outro serviço de e-mail
        auth: {
            user: 'seu-email@gmail.com', // Substitua pelo seu e-mail
            pass: 'sua-senha' // Substitua pela sua senha de e-mail (use variáveis de ambiente para segurança)
        }
    });

    // Configuração do e-mail
    const mailOptions = {
        from: 'seu-email@gmail.com', // E-mail remetente
        to: email, // E-mail do destinatário
        subject: 'Código de Recuperação de Senha',
        text: `Seu código de recuperação de senha é: ${verificationCode}` // Corpo do e-mail com o código
    };

    // Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Erro ao enviar o e-mail.' });
        } else {
            console.log('Código enviado: ' + verificationCode);
            return res.json({ success: true, message: 'Código enviado para o seu e-mail!' });
        }
    });
});

// Rota para verificar o código inserido
app.post('/verify-code', (req, res) => {
    const { email, codigo } = req.body;

    // Verificar se o código informado é igual ao enviado
    if (codigo === verificationCode) {
        return res.json({ success: true, message: 'Código verificado com sucesso!' });
    } else {
        return res.json({ success: false, message: 'Código inválido. Tente novamente.' });
    }
});

// Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
