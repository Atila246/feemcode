const eventos = document.querySelectorAll(".evento-item")
eventos.forEach(evento => {
    evento.addEventListener('click', () => {
        window.location.href = "evento.html"
    })
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
