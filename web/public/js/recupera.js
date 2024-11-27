let verificationCode = ''; // Variável global para armazenar o código enviado

// Função para exibir as etapas do processo
function showStep(step) {
    // Oculta todas as etapas
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('hidden');
    });
    // Exibe a etapa atual
    document.getElementById('step' + step).classList.remove('hidden');
}

// Função para enviar o código de recuperação para o email
function sendRecoveryEmail() {
    const email = document.getElementById('email').value;
    if (!email) {
        alert('Por favor, insira um e-mail.');
        return;
    }

    fetch('http://localhost:3000/request-recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao conectar com o servidor. Verifique se o servidor está ativo.');
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Código enviado!') {
            verificationCode = data.token; // Supondo que o servidor retorna um 'token' válido
            showStep(2); // Avança para a Etapa 2 (verificar código)
            alert('Código enviado para o seu e-mail!');
        } else {
            alert(data.message || 'Erro ao enviar o código.');
        }
    })
    .catch(error => {
        console.error('Erro ao enviar o código:', error);
        alert(error.message);
    });
}

// Função para verificar o código inserido pelo usuário
function verifyCode() {
    const email = document.getElementById('emailVerify').value;
    const codigo = document.getElementById('codigo').value;

    if (!codigo) {
        alert('Por favor, insira o código de verificação.');
        return;
    }

    fetch('http://localhost:3000/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao verificar o código. Verifique a conexão com o servidor.');
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Código verificado com sucesso!') {
            showStep(3); // Avança para a Etapa 3 (redefinir senha)
            alert('Código verificado com sucesso!');
            document.getElementById('error-message').style.display = 'none'; // Oculta a mensagem de erro
        } else {
            document.getElementById('error-message').style.display = 'block'; // Exibe a mensagem de erro
        }
    })
    .catch(error => {
        console.error('Erro ao verificar o código:', error);
        alert(error.message);
    });
}

// Função para validar e redefinir a senha
function validateResetForm() {
    const novaSenha = document.getElementById('nova_senha').value;
    const confirmaSenha = document.getElementById('confirma_senha').value;
    const resetMessage = document.getElementById('resetMessage');

    // Verifica se as senhas coincidem
    if (novaSenha !== confirmaSenha) {
        resetMessage.textContent = 'As senhas não coincidem.';
        resetMessage.style.color = 'red';
        return false; // Impede o envio do formulário
    }

    // Verifica se a senha é forte
    const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!strongPasswordPattern.test(novaSenha)) {
        resetMessage.textContent = 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.';
        resetMessage.style.color = 'red';
        return false; // Impede o envio do formulário
    }

    resetMessage.textContent = ''; // Limpa as mensagens de erro
    alert('Senha redefinida com sucesso!');
    return true; // Permite o envio do formulário
}
