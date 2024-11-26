// fetch('http://localhost:3000/usuarios')
//     .then(res => res.json())
//     .then((data) => {
//         data.forEach((item) => {
//             perfil_nome.innerHTML = item.nome
//         })
//     })
//     .catch((err) => {
//         console.log("Erro"+err)
//     })

// modal
// var publicar_btn = document.getElementById('publicar-btn')
// var publicacao_modal = document.getElementById('publicacao-modal'); 
// var close_btn = document.getElementsByClassName('close');

// publicar_btn.onclick = function () {
//     publicacao_modal.style.display = "flex"
//     console.log(publicacao_modal)
// }

// // Fechar POPUP e formulário ao clicar no 'X'
// for (let i = 0; i < close_btn.length; i++) {
//     close_btn[i].onclick = function () {
//         publicacao_modal.style.display = "none"
//     }
// }

// window.onclick = function (event) {
//     if(event.target == publicacao_modal){
//         publicacao_modal.style.display = "none"
//     }      
// }



const perfil_nome = document.getElementById("perfil-nome")
const underline = document.querySelector('.underline')
const aba1 = document.getElementById("aba1")
const aba2 = document.getElementById("aba2")

const conteudos_perfil = document.querySelector(".conteudos-perfil")
const comunidades_perfil = document.querySelector(".comunidades-perfil")


aba1.addEventListener('click', () => {
    aba1.classList.add('ativo')
    aba2.classList.remove('ativo')
    
    underline.classList.remove('animatein')
    underline.classList.remove('animateout')

    let tamanhoAba2 = underline.style.width = `${aba2.offsetWidth}px`
    let tamanhoAba1 = underline.style.width = `${aba1.offsetWidth}px`
    underline.style.width = tamanhoAba1
    console.log(tamanhoAba1)
    document.documentElement.style.setProperty('--tamanho-aba-2',tamanhoAba2)
    
    underline.classList.add('animateout')

    conteudos_perfil.style.cssText = "display: block;"
    comunidades_perfil.style.cssText = "display: none;"

})

aba2.addEventListener('click', () => {
    aba2.classList.add('ativo')
    aba1.classList.remove('ativo')
    
    underline.classList.remove('animateout')
    underline.classList.remove('animatein')
    
    let tamanhoAba1 = underline.style.width = `${aba1.offsetWidth}px`
    let tamanhoAba2 = underline.style.width = `${aba2.offsetWidth}px`
    underline.style.width = tamanhoAba2
    // console.log(tamanhoAba1)
    document.documentElement.style.setProperty('--tamanho-aba-1',tamanhoAba1)

    underline.classList.add('animatein')

    conteudos_perfil.style.cssText = "display: none;"
    comunidades_perfil.style.cssText = "display: flex;"
})


// function toggleEditProfile() {
//     const editSection = document.getElementById('editProfileSection');
//     if (editSection.classList.contains('hidden')) {
//         editSection.classList.remove('hidden'); 
//     } else {
//         editSection.classList.add('hidden'); 
//     }
// }

// function salvarPerfil() {
//     const novoNome = document.getElementById('novoUsuario').value;
//     const novaDescricao = document.getElementById('descricao').value;

//     document.getElementById('profile-name').innerText = novoNome;
//     document.getElementById('profile-description').innerText = novaDescricao;

//     document.getElementById('editProfileSection').classList.add('hidden');
// }


// document.addEventListener("DOMContentLoaded", () => {
//     const toggleButton = document.getElementById("toggle-theme");
//     const body = document.body;

//     if (localStorage.getItem("theme") === "dark") {
//         body.classList.add("dark-mode");
//     }

//     toggleButton.addEventListener("click", () => {
//         body.classList.toggle("dark-mode");

//         if (body.classList.contains("dark-mode")) {
//             localStorage.setItem("theme", "dark");
//             toggleButton.innerHTML = '<i class="fi fi-sr-sun"></i>';
//         } else {
//             localStorage.setItem("theme", "light");
//             toggleButton.innerHTML = '<i class="fi fi-sr-moon"></i>';
//         }
//     });
// });


