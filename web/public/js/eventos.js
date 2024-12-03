const eventos = document.querySelectorAll(".evento-item")
eventos.forEach(evento => {
    evento.addEventListener('click', () => {
        window.location.href = "evento.html"
    })
})

/*rota para detalhe do video*/
const videos = document.querySelectorAll(".video-item")
videos.forEach(video => {
    video.addEventListener('click', () => {
        window.location.href = "video.html"
    })
})

/*mostrand0/escondendo as opções de moderador*/
const user = JSON.parse(sessionStorage.getItem("Usuario"))
const evento_btn = document.getElementById('evento-btn')

if(user.moderador){
  evento_btn.style.display = "block"
}

/*modal*/
var evento_modal = document.getElementById('evento-modal')
var close_btn = document.getElementsByClassName('close')

evento_btn.onclick = function () {
  evento_modal.style.display = "flex";
}

for (let i = 0; i < close_btn.length; i++) {
    close_btn[i].onclick = function () {
        evento_modal.style.display = "none"
    }
}

window.onclick = function (event) {
    if (event.target == evento_modal) {
      evento_modal.style.display = "none"
    } 
}

/*salvando canal*/
const imagem_evento = document.getElementById('imagem-evento')
const titulo_evento = document.getElementById('titulo-evento')
const desc_evento = document.getElementById('desc-evento')
const data_evento = document.getElementById('data-evento')
const horario_evento = document.getElementById('horario-evento')
const local_evento = document.getElementById('local-evento')

console.log(user.nomeUsuario)

const btn_salvar_evento = document.getElementById('btn-salvar-evento')

btn_salvar_evento.addEventListener('click', () => {
    const dataHora = new Date(`${data_evento.value}T${horario_evento.value}`)
    const dataFormatada = dataHora.toISOString().split('T')[0]
    const horaFormatada = dataHora.toISOString().split('T')[1].slice(0, 8)

    fetch("http://localhost:3000/evento", {
      method: 'POST',
      body: JSON.stringify({foto: "img/perfil-sem-foto.jpg", 
        nomeUsuario: user.nomeUsuario,
        imagem: imagem_evento.value, 
        titulo: titulo_evento.value, 
        descricao: desc_evento.value, 
        data: dataFormatada, 
        horario: horaFormatada,
        local: local_evento.value}),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })

    window.location.href="eventos.html"
})

const modoEscuroAtivado = localStorage.getItem('modoEscuro') === 'true';

if (modoEscuroAtivado) {
  document.body.classList.add('dark');
  document.getElementById('claroescuro').classList.add('dark');
}


let claroescuro = document.getElementById('claroescuro');

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('modoEscuro') === 'true') {
    document.body.classList.add('dark');
    claroescuro.classList.add('dark'); 
    toggleDarkModeElements(); 
  }
});

claroescuro.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  claroescuro.classList.toggle('dark');

  const modoEscuroAtivado = document.body.classList.contains('dark');
  localStorage.setItem('modoEscuro', modoEscuroAtivado);

  toggleDarkModeElements();
});

function toggleDarkModeElements() {
  document.querySelectorAll('.canal__videos h3').forEach(h3 => {
    h3.classList.toggle('dark');
  });

  document.querySelectorAll('.perfil-canal button').forEach(button => {
    button.classList.toggle('dark');
  });

}
