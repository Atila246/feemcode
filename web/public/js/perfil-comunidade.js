/*modal*/
var publicar_btn = document.getElementById('publicar-btn')
var publicacao_modal = document.getElementById('publicacao-modal'); 
var close_btn = document.getElementsByClassName('close');

publicar_btn.onclick = function () {
    publicacao_modal.style.display = "flex"
    console.log(publicacao_modal)
}

// Fechar POPUP e formulário ao clicar no 'X'
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


let claroescuro = document.getElementById('claroescuro'); 
claroescuro.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  document.querySelectorAll('.menu, .menu__nav ul li a').forEach(element => {
    element.classList.toggle('dark');
  });

  document.querySelectorAll('.container__perfil-info, .perfil__info, .perfil__nome-desc, .botao-perfil').forEach(element => {
    element.classList.toggle('dark');
  });

  document.querySelectorAll('.perfil__aba-content, .postagens__categorias span').forEach(element => {
    element.classList.toggle('dark');
  });

  document.querySelectorAll('.posts-comunidade h5, .post-corpo p').forEach(element => {
    element.classList.toggle('dark');
  });

  document.querySelectorAll('.modal, .modal-content, .close').forEach(element => {
    element.classList.toggle('dark');
  });

  document.querySelectorAll('.publicacao__form-item, .publicacao__form button').forEach(element => {
    element.classList.toggle('dark');
  });

  document.querySelectorAll('.icon-modify').forEach(element => {
    element.classList.toggle('dark');
  });
});



