const titulo = document.getElementById("titulo")
const descricao = document.getElementById("descricao")
const usuario = JSON.parse(sessionStorage.getItem("Usuario"))
const comunidade = JSON.parse(sessionStorage.getItem("Comunidade"))
console.log(comunidade)

var create_post = document.getElementById('publicar')
var publicar_btn = document.getElementById('publicar-btn')
var publicacao_modal = document.getElementById('publicacao-modal')
var close_btn = document.getElementsByClassName('close')

/*criar uma postagem e modal*/
create_post.addEventListener('click', () => {
    fetch("http://localhost:3000/postagem", {
        method: "POST",
        body: JSON.stringify({titulo: titulo.value, descricao: descricao.value, nomeUsuario: usuario.nomeUsuario, nomeComunidade: comunidade.nomeComunidade}),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then((data) => {
        console.log(data)
        window.location.href = "perfil-comunidade.html"
    })
    .catch(err => {
        console.log(err)
    })
})

publicar_btn.onclick = function () {
    publicacao_modal.style.display = "flex"
    console.log(publicacao_modal)
}

for (let i = 0; i < close_btn.length; i++) {
    close_btn[i].onclick = function () {
        publicacao_modal.style.display = "none"
    }
}

window.onclick = function (event) {
    if(event.target == publicacao_modal){
        publicacao_modal.style.display = "none"
    }      
}

/*trazer dados da comunidade */
const perfil_imagem = document.getElementById('perfil-imagem')
const perfil_nome = document.getElementById('perfil-nome')
const perfil_bio = document.getElementById('perfil-descricao')
perfil_imagem.src = comunidade.foto
perfil_nome.innerHTML = comunidade.nomeComunidade
perfil_bio.innerHTML = comunidade.bio


const modoEscuroAtivado = localStorage.getItem('modoEscuro') === 'true';

if (modoEscuroAtivado) {
  document.body.classList.add('dark');
  document.getElementById('claroescuro').classList.add('dark');
}


let claroescuro = document.getElementById('claroescuro');

claroescuro.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  document.querySelectorAll('.postagens__categorias span').forEach(span => {
    span.classList.toggle('dark');
  });

  document.querySelectorAll('.perfil__nome-desc h3, .perfil__nome-desc p').forEach(element => {
    element.classList.toggle('dark');
  });

  document.querySelectorAll('.post-corpo h2, .post-corpo p').forEach(element => {
    element.classList.toggle('dark');
  });

  document.querySelectorAll('.perfil__aba-content h5').forEach(h5 => {
    h5.classList.toggle('dark');
  });

  let img = claroescuro.querySelector('img');
  if (document.body.classList.contains('dark')) {
    img.src = 'img/lampada-apagada.png'; 
  } else {
    img.src = 'img/lampada-brilhante.png'; 
  }
});
