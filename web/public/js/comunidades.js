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

var isLoggedIn = true; // Mudar para 'false' para simular usuário não logado

// Elementos de referência
var comunidade_btn = document.getElementById('comunidade-btn');
var login_modal = document.getElementById('login-modal');
var comunidade_modal = document.getElementById('comunidade-modal'); // Corrigido nome da variável
var close_btn = document.getElementsByClassName('close');

// Abrir POPUP ou formulário com base no login
comunidade_btn.onclick = function () {
    if (isLoggedIn) {
        // Se estiver logado, exibe o formulário de criação
        comunidade_modal.style.display = "flex";
    } else {
        // Se não estiver logado, exibe o aviso de login
        login_modal.style.display = "flex";
    }
};

// Fechar POPUP e formulário ao clicar no 'X'
for (let i = 0; i < close_btn.length; i++) {
    close_btn[i].onclick = function () {
        login_modal.style.display = "none";
        comunidade_modal.style.display = "none";
    };
}

// Fechar POPUP ao clicar fora dele
window.onclick = function (event) {
    if (event.target == login_modal) {
        login_modal.style.display = "none";
    } else if (event.target == comunidade_modal) {
        comunidade_modal.style.display = "none";
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

//modo claro e escuro
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-theme");
    const body = document.body;

    // Verificar o tema salvo
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Salvar a preferência no localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            toggleButton.innerHTML = '<i class="fi fi-sr-sun"></i>';
        } else {
            localStorage.setItem("theme", "light");
            toggleButton.innerHTML = '<i class="fi fi-sr-moon"></i>';
        }
    });
});
