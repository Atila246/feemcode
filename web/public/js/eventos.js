const eventos = document.querySelectorAll(".evento-item")
eventos.forEach(evento => {
    evento.addEventListener('click', () => {
        window.location.href = "evento.html"
    })
})

let claroescuro = document.getElementById('claroescuro');

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
