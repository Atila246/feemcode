const videos = document.querySelectorAll(".video-item")
videos.forEach(video => {
    video.addEventListener('click', () => {
        window.location.href = "video.html"
    })
})





let claroescuro = document.getElementById('claroescuro');

const modoEscuroAtivado = localStorage.getItem('modoEscuro') === 'true';

if (modoEscuroAtivado) {
  document.body.classList.add('dark');
  claroescuro.classList.add('dark');
  aplicarModoEscuro();
}

claroescuro.addEventListener('click', () => {
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
