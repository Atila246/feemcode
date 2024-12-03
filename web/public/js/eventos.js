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


claroescuro.addEventListener('click', () => {
  // Alternar a classe 'dark' no body e no botão
  document.body.classList.toggle('dark');
  claroescuro.classList.toggle('dark');
  
  // Alternar a classe 'dark' em todos os spans dentro de .evento__categorias
  document.querySelectorAll('.evento__categorias span').forEach(span => {
    span.classList.toggle('dark');
  });

  // Alternar a classe 'dark' em todos os h2 dentro de .evento-descricao
  document.querySelectorAll('.evento-descricao h2').forEach(h2 => {
    h2.classList.toggle('dark');
  });
  
  // Alternar a classe 'dark' em todos os spans dentro de .evento-descricao
  document.querySelectorAll('.evento-descricao span').forEach(span => {
    span.classList.toggle('dark');
  });
  
  // Alternar a classe 'dark' em todos os parágrafos dentro de .evento-descricao
  document.querySelectorAll('.evento-descricao p').forEach(p => {
    p.classList.toggle('dark');
  });
});
