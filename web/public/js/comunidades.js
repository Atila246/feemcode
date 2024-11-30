const config_post1 = document.getElementById('config-post1');
const config_post2 = document.getElementById('config-post2');
const config_post3 = document.getElementById('config-post3');

const options_post1 = document.getElementById('options-post1');
const options_post2 = document.getElementById('options-post2');
const options_post3 = document.getElementById('options-post3');
let ligado = false;

const comunidade_postagens = document.querySelector('.comunidade__postagens')

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
})

fetch("http://localhost:3000/postagens")
    .then(res => res.json())
    .then((data) => {
        data.forEach(item => {
            addHtml(item)
        });
    })
    .catch(err => {
        console.log(err)
    })

function addHtml(data) {
    postagemHtml = `
            <div class="comunidade__post card">
                    <div class="post-header">
                        <div class="perfil-post">
                            <a href="perfil-comunidade.html">
                                <img src="" alt="Foto de perfil">
                                <div class="perfil-post__nome">
                                    <div>
                                        <span id="comunidade">${data.comunidade.nomeComunidade}</span>
                                        <span>
                                            <i class="fi fi-sr-bullet"></i>
                                        </span>
                                        <span class="temp">1 h</span>
                                    </div>
                                    <span class="user">@${data.usuario.nomeUsuario}</span>
                                </div> 
                            </a>
                        </div>
                        
                        <div class="perfil-config">
                            <button>Entrar</button>
                            <div class="pontinhos-post"  id="config-post3">
                                <i class="fi fi-br-menu-dots-vertical"></i>
                                <div class="pontinhos-list">
                                    <ul  id="options-post3">
                                        <li>Salvos</li>
                                        <li>Salvos</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="post-corpo">
                        <h2 id="perfil-titulo">${data.conteudo.titulo}</h2>
                        <p id="perfil-descricao">${data.conteudo.descricao}</p>
                    </div>

                    <div class="post-opcoes">
                        <button class="post-like">
                            <i class="fi fi-rs-heart"></i>
                        </button>
                        <button class="post-save">
                            <i class="fi fi-rr-bookmark"></i>
                        </button>
                    </div>

                </div>
        `
        comunidade_postagens.innerHTML += postagemHtml
}

const comunidade_usuarios = document.querySelector('.comunidade__usuarios')

fetch("http://localhost:3000/comunidades")
    .then(res => res.json())
    .then((data) => {
        data.forEach(item => {
            console.log(item)
            addHtmlComunidade(item)
        })
    })
    .catch(error => {
        console.log(error)
    })

function addHtmlComunidade(data) {
    comunidadeHtml = `
                <div class="perfil-comunidade"> 
                    <div class="perfil-comunidade__dados">
                        <figure class="perfil-comunidade__image">
                            <img src="${data.foto}" alt="Imagem comunidade">
                        </figure>
                        <div class="perfil-comunidade__nome">
                            <span>${data.nomeComunidade}</span>
                            <span>@meninasdigitais</span>
                        </div>
                    </div>
                    <button>Entrar</button>
                </div>
            `
            comunidade_usuarios.innerHTML += comunidadeHtml
            console.log(data.nomeComunidade)
}

// modal
var isLoggedIn = true;
var comunidade_btn = document.getElementById('comunidade-btn');
var login_modal = document.getElementById('login-modal');
var comunidade_modal = document.getElementById('comunidade-modal');
var close_btn = document.getElementsByClassName('close');

comunidade_btn.onclick = function () {
    if (isLoggedIn) {
        comunidade_modal.style.display = "flex";
    } else {
        login_modal.style.display = "flex";
    }
}

for (let i = 0; i < close_btn.length; i++) {
    close_btn[i].onclick = function () {
        login_modal.style.display = "none";
        comunidade_modal.style.display = "none";
    };
}

window.onclick = function (event) {
    if (event.target == login_modal) {
        login_modal.style.display = "none";
    } else if (event.target == comunidade_modal) {
        comunidade_modal.style.display = "none";
    }
}

const posts = document.querySelectorAll(".comunidade__post")
posts.forEach(post => {
    post.addEventListener('click', () => {
        window.location.href = "post.html"
    })
})

let obj = sessionStorage.getItem("Usuario")
console.log(obj)

window.onload = function(){
    if(obj!=null){
        let perfil = document.getElementById("cadastrado")
        perfil.style.cssText='display: block;'
        let botao = document.getElementById("cadastre-se")
        botao.style.cssText='display: none;'

        let link = document.getElementById("link-cadastro")
        link.href="perfil.html"
    }
}

//modo claro e escuro
// document.addEventListener("DOMContentLoaded", () => {
//     const toggleButton = document.getElementById("toggle-theme");
//     const body = document.body;

//     // Verificar o tema salvo
//     if (localStorage.getItem("theme") === "dark") {
//         body.classList.add("dark-mode");
//     }

//     toggleButton.addEventListener("click", () => {
//         body.classList.toggle("dark-mode");

//         // Salvar a preferência no localStorage
//         if (body.classList.contains("dark-mode")) {
//             localStorage.setItem("theme", "dark");
//             toggleButton.innerHTML = '<i class="fi fi-sr-sun"></i>';
//         } else {
//             localStorage.setItem("theme", "light");
//             toggleButton.innerHTML = '<i class="fi fi-sr-moon"></i>';
//         }
//     });
// });