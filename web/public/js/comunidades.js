const config_post1 = document.getElementById('config-post1');
const config_post2 = document.getElementById('config-post2');
const config_post3 = document.getElementById('config-post3');

const options_post1 = document.getElementById('options-post1');
const options_post2 = document.getElementById('options-post2');
const options_post3 = document.getElementById('options-post3');
let ligado = false;

const comunidade_postagens = document.querySelector('.comunidades__postagens')

config_post1.addEventListener("click", () => {
    if (!ligado) {
        options_post1.style.display = "flex";
        ligado = true;
    } else {
        options_post1.style.display = "none";
        ligado = false;
    }
});

config_post2.addEventListener("click", () => {
    if (!ligado) {
        options_post2.style.display = "flex";
        ligado = true;
    } else {
        options_post2.style.display = "none";
        ligado = false;
    }
});

config_post3.addEventListener("click", () => {
    if (!ligado) {
        options_post3.style.display = "flex";
        ligado = true;
    } else {
        options_post3.style.display = "none";
        ligado = false;
    }
});


console.log("Ola");

var isLoggedIn = false; // Mudar para 'false' para simular usuário não logado

// Elementos de referência
var criarComunidadeBtn = document.getElementById('criarComunidadeBtn');
var loginModal = document.getElementById('loginModal');
var criarComunidade = document.getElementById('Criarcomunidade'); // Corrigido nome da variável
var closeButtons = document.getElementsByClassName('close');

// Abrir POPUP ou formulário com base no login
criarComunidadeBtn.onclick = function () {
    if (isLoggedIn) {
        // Se estiver logado, exibe o formulário de criação
        criarComunidade.style.display = "block";
    } else {
        // Se não estiver logado, exibe o aviso de login
        loginModal.style.display = "block";
    }
};

// Fechar POPUP e formulário ao clicar no 'X'
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function () {
        loginModal.style.display = "none";
        criarComunidade.style.display = "none";
    };
}

// Fechar POPUP ao clicar fora dele
window.onclick = function (event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    } else if (event.target == criarComunidade) {
        criarComunidade.style.display = "none";
    }
};

// Simulação de login ao clicar no botão "Fazer Login"
//document.getElementById('loginButton').onclick = function() {
//  loginModal.style.display = "none";
//alert('Você será redirecionado para a página de login.');
//window.location.href = 'login.html';
//};

fetch("http://localhost:3000/postagens")
    .then(res => res.json())
    .then((data) => {
        data.forEach(item => {
            console.log(item)
            addHtml(item)
        });
    })
    .catch(err => {
        console.log(err)
    })

function addHtml(data) {
    postagemHtml = `
        <div class="comunidades__post card">
            <div class="post__perfil">
                <div class="perfil-post">
                    <img src="img/meninas-digitais.jpeg" alt="">
                    <span> ${data.comunidade.nomeComunidade} </span>
                </div>
                <div class="perfil-config">
                    <button>Entrar</button>
                    <div class="pontinhos__post" id="config-post1">
                        <i class="fi fi-rr-menu-dots"></i>
                        <div class="pontinhos-list">
                            <ul id="options-post1">
                                <li>Salvos</li>
                                <li>Salvos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <h2> ${data.conteudo.titulo} </h2>
            <p> ${data.conteudo.descricao} </p>
            <div class="post__butaos">
                <button class="post__like">
                    <i class="fi fi-rs-heart"></i>
                </button>
            </div>
        </div>
    `
    console.log(postagemHtml)
    comunidade_postagens.innerHTML += postagemHtml
}