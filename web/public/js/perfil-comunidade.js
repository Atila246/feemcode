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


