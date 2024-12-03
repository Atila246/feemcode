

// modal
isLoggedIn = true

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

/*buscando as postagens */
const todas_comunidades = document.querySelector('.todas-comunidades')
const comunidade_postagens = document.querySelector('.comunidade__postagens')
const perfil_comunidade = document.querySelectorAll('.perfil-comunidade')

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
    let postagemHtml = `
            <div class="comunidade__post card">
                    <div class="post-header">
                        <div class="perfil-post">
                            <a href="perfil-comunidade.html">
                                <img src="${data.comunidade.foto}" alt="Foto de perfil">
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


const posts = document.querySelectorAll(".comunidade__post")
posts.forEach(post => {
    post.addEventListener('click', () => {
        window.location.href = "post.html"
    })
})

/*buscando comunidades */
fetch("http://localhost:3000/comunidades")
    .then(res => res.json())
    .then((data) => {
        data.forEach(item => {
            addHtmlComunidade(item)
        })
    })
    .catch(error => {
        console.log(error)
    })

function addHtmlComunidade(data) {
    let comunidadeHtml = `
                <a href="perfil-comunidade.html" id="item${data.id}">
                    <div class="perfil-comunidade"> 
                        <div class="perfil-comunidade__dados">
                            <figure class="perfil-comunidade__image">
                                <img src="${data.foto}" alt="Imagem da comunidade">
                            </figure>
                            <div class="perfil-comunidade__nome">
                                <span>${data.nomeComunidade}</span>
                                <span>@${data.criador.nomeUsuario}</span>
                            </div>
                        </div>
                        <button>Entrar</button>
                    </div>
                </a>
            `
            todas_comunidades.innerHTML += comunidadeHtml 
            console.log(data)
}

// function salvarComunidade(data){
//     fetch("http://localhost:3000/uma-comunidade", {
//         method: 'POST',
//         body: JSON.stringify({id: parseInt(data)}),
//         headers: {
//             "Content-Type": "application/json; charset=UTF-8"
//         }
//     })
//     .then(res => res.json())
//     .then((data) => {
//         sessionStorage.setItem("Comunidade",JSON.stringify(data))
//         console.log(sessionStorage.getItem("Comunidade"))
//         window.onload()
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

/*salvar comunidade */
const nome_comunidade = document.getElementById('nome-comunidade')
const bio_comunidade = document.getElementById('bio-comunidade')
const foto = document.getElementById('photo')
const user = JSON.parse(sessionStorage.getItem("Usuario"))
console.log(user.nomeUsuario)

const btn_salvar_comunidade = document.getElementById('btn-salvar-comunidade')

btn_salvar_comunidade.addEventListener('click', () => {
    fetch("http://localhost:3000/comunidade", {
        method: 'POST',
        body: JSON.stringify({ foto: "img/perfil-sem-foto.jpg", nomeUsuario: user.nomeUsuario, nomeComunidade: nome_comunidade.value, bio: bio_comunidade.value }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then((data) => {
        sessionStorage.setItem("Comunidade",JSON.stringify(data))
        console.log(sessionStorage.getItem("Comunidade"))
    })
    .catch(err => {
        console.log(err)
    })

    window.location.href="comunidades.html"
})


/*opções da publicação */
const config_post1 = document.getElementById('config-post1')
const config_post2 = document.getElementById('config-post2')
const config_post3 = document.getElementById('config-post3')

const options_post1 = document.getElementById('options-post1')
const options_post2 = document.getElementById('options-post2')
const options_post3 = document.getElementById('options-post3')

let ligado = false;

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
})

config_post3.addEventListener("click", () => {
    if (!ligado) {
        options_post3.style.display = "flex";
        ligado = true;
    } else {
        options_post3.style.display = "none";
        ligado = false;
    }
})


const modoEscuroAtivado = localStorage.getItem('modoEscuro') === 'true';

if (modoEscuroAtivado) {
  document.body.classList.add('dark');
  document.getElementById('claroescuro').classList.add('dark');
}

let claroescuro = document.getElementById('claroescuro');

claroescuro.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  claroescuro.classList.toggle('dark');
  
  const modoEscuroAtivado = document.body.classList.contains('dark');
  localStorage.setItem('modoEscuro', modoEscuroAtivado);

  document.querySelectorAll('.canal__videos h3').forEach(h3 => {
    h3.classList.toggle('dark');
  });

  document.querySelectorAll('.perfil-canal button').forEach(button => {
    button.classList.toggle('dark');
  });
});

