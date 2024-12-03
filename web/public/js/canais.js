var canal_btn = document.getElementById('canal-btn')
var canal_modal = document.getElementById('canal-modal')
var close_btn = document.getElementsByClassName('close')

canal_btn.onclick = function () {
  canal_modal.style.display = "flex";
}

for (let i = 0; i < close_btn.length; i++) {
    close_btn[i].onclick = function () {
        canal_modal.style.display = "none"
    }
}

window.onclick = function (event) {
    if (event.target == canal_modal) {
      canal_modal.style.display = "none"
    } 
}

/*rota para detalhe do video*/
const videos = document.querySelectorAll(".video-item")
videos.forEach(video => {
    video.addEventListener('click', () => {
        window.location.href = "video.html"
    })
})

/*salvando canal*/
const nome_canal = document.getElementById('nome-canal')
const desc_canal = document.getElementById('desc-canal')
const foto = document.getElementById('photo')

const user = JSON.parse(sessionStorage.getItem("Usuario"))
console.log(user.nomeUsuario)

const btn_salvar_canal = document.getElementById('btn-salvar-canal')

btn_salvar_canal.addEventListener('click', () => {
    fetch("http://localhost:3000/canal", {
      method: 'POST',
      body: JSON.stringify({foto: "img/perfil-sem-foto.jpg", nomeUsuario: user.nomeUsuario, nomeCanal: nome_canal.value, descricao: desc_canal.value}),
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

    window.location.href="canais.html"
})

/*buscando canais*/
fetch("http://localhost:3000/canais")
    .then(res => res.json())
    .then((data) => {
        data.forEach(item => {
            addHtml(item)
        })
    })
    .catch(error => {
        console.log(error)
    })

function addHtml(data){
    canalHtml = `
      <div class="perfil-canal">
          <div class="perfil-canal__dados">
                <figure class="perfil-canal__image">
                    <img src="img/perfil-sem-foto.jpg" alt="Perfil">
                </figure>
                <div class="perfil-canal__nome">
                  <span>${data.nomeCanal}</span>
                  <span>@${data.moderador.nomeUsuario}</span>
                </div>
          </div>
          <button>Inscrever-se</button>
      </div>
    `
    const canal_list = document.querySelector('.canal-list')
    canal_list.innerHTML += canalHtml
}

/*mostrand/escondendo as opções de moderador*/
console.log(user.moderador)
if(user.moderador){
  canal_btn.style.display = "block"
}

/*modo claro e escuro*/
let claroescuro = document.getElementById('claroescuro');

const modoEscuroAtivado = localStorage.getItem('modoEscuro') === 'true';

if (modoEscuroAtivado) {
  document.body.classList.add('dark');
  claroescuro.classList.add('dark');
  aplicarModoEscuro();
}

claroescuro.addEventListener('click', () => {
<<<<<<< HEAD
  // Alternar a classe 'dark' no body e no botão
  document.body.classList.toggle('dark')
  claroescuro.classList.toggle('dark')
  
  // Alternar a classe 'dark' em todos os h3 dentro de .canal__videos
  document.querySelectorAll('.canal__videos h3').forEach(h3 => {
    h3.classList.toggle('dark');
  })
  
  // Alternar a classe 'dark' em todos os botões dentro de .perfil-canal
  document.querySelectorAll('.perfil-canal button').forEach(button => {
    button.classList.toggle('dark');
  })
})
=======
  document.body.classList.toggle('dark');
  claroescuro.classList.toggle('dark');
  
  const modoEscuroAtivado = document.body.classList.contains('dark');
  localStorage.setItem('modoEscuro', modoEscuroAtivado);
  
  aplicarModoEscuro();
});

function aplicarModoEscuro() {
  document.querySelectorAll('.canal__sidebar').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.canal__sidebar h3').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.canal-list .canal-item').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.perfil-canal button').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.perfil-canal__dados figure img').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.perfil-canal__nome span:nth-child(1)').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.perfil-canal__nome span:nth-child(2)').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.canal__videos').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.canal__videos h3').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.video-grid .video-item').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.video-item__source video').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.titulo-desc h3').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.titulo-desc span').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.video-item__desc img').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.evento__categorias span').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.evento-descricao h2').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.evento-descricao span').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.evento-descricao p').forEach(item => {
    item.classList.toggle('dark');
  });
}
>>>>>>> e7fd4feb60802f9ebba040a5044a990f02db7daf
