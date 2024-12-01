const videos = document.querySelectorAll(".video-item")
videos.forEach(video => {
    video.addEventListener('click', () => {
        window.location.href = "video.html"
    })
})

let claroescuro = document.getElementById('claroescuro');

claroescuro.addEventListener('click', () => {
  // Alternar a classe 'dark' no body e no botão
  document.body.classList.toggle('dark');
  claroescuro.classList.toggle('dark');
  
  // Alternar a classe 'dark' em todos os h3 dentro de .canal__videos
  document.querySelectorAll('.canal__videos h3').forEach(h3 => {
    h3.classList.toggle('dark');
  });
  
  // Alternar a classe 'dark' em todos os botões dentro de .perfil-canal
  document.querySelectorAll('.perfil-canal button').forEach(button => {
    button.classList.toggle('dark');
  });
  

});
    