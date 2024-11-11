const nome_perfil = document.getElementById('profile-name')
const underline = document.querySelector('.underline')
const aba1 = document.getElementById("aba1")
const aba2 = document.getElementById("aba2")

const conteudos_perfil = document.querySelector(".conteudos-perfil")
const comunidades_perfil = document.querySelector(".comunidades-perfil")


fetch('http://localhost:3000/usuarios')
    .then(res => res.json())
    .then((data) => {
        data.forEach((item) => {
            nome_perfil.innerHTML = item.nome
        })
    })
    .catch((err) => {
        console.log("Erro"+err)
    })


aba1.addEventListener('click', () => {
    aba1.classList.add('ativo')
    aba2.classList.remove('ativo')
    
    underline.classList.remove('animatein')
    underline.classList.remove('animateout')
    underline.style.width = `${aba1.offsetWidth}px`
    underline.classList.add('animateout')

    conteudos_perfil.style.cssText = "display: block;"
    comunidades_perfil.style.cssText = "display: none;"

})

aba2.addEventListener('click', () => {
    aba2.classList.add('ativo')
    aba1.classList.remove('ativo')
    
    underline.classList.remove('animateout')
    underline.classList.remove('animatein')
    underline.style.width = `${aba2.offsetWidth}px`
    underline.classList.add('animatein')

    conteudos_perfil.style.cssText = "display: none;"
    comunidades_perfil.style.cssText = "display: flex;"
})
    
// Obter o modal
var modal = document.getElementById("editProfileModal");

// Obter o botão que abre o modal
var btn = document.getElementById("edit-profile-btn");

// Obter o elemento <span> que fecha o modal
var span = document.getElementById("closeModal");

// Quando o usuário clica no botão, abre o modal

btn.addEventListener('click', () => {
    modal.style.display = "block";
}) 

// Quando o usuário clica no <span> (x), fecha o modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// Quando o usuário clica fora do modal, fecha-o
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "nome";
//     }
// }

// Quando o formulário é enviado
// document.getElementById("editProfileForm").onsubmit = function(event) {
//     event.preventDefault(); // Impede o envio padrão

//     // Captura os valores dos campos
//     var username = document.getElementById("username").value;
//     var description = document.getElementById("description").value;
//     var profilePicture = document.getElementById("profilePicture").files[0];
//     var bannerPicture = document.getElementById("bannerPicture").files[0];

//     // Atualiza o nome e a descrição do perfil
//     document.getElementById("profile-name").innerText = username;
//     document.getElementById("profile-description").innerText = description;

//     // Atualiza a foto de perfil se uma nova imagem for carregada
//     if (profilePicture) {
//         var reader = new FileReader();
//         reader.onload = function(e) {
//             document.querySelector(".profile-pic").src = e.target.result;
//         }
//         reader.readAsDataURL(profilePicture);
//     }

//     // Atualiza o banner se uma nova imagem for carregada
//     if (bannerPicture) {
//         var bannerReader = new FileReader();
//         bannerReader.onload = function(e) {
//             document.querySelector(".profile-banner-img").src = e.target.result;
//         }
//         bannerReader.readAsDataURL(bannerPicture);
//     }

//     // Fecha o modal
//     modal.style.display = "none";
// }

// Função para alternar a visibilidade da área de edição de perfil
function toggleEditProfile() {
    const editSection = document.getElementById('editProfileSection');
    if (editSection.classList.contains('hidden')) {
        editSection.classList.remove('hidden'); // Mostra a seção de edição
    } else {
        editSection.classList.add('hidden'); // Esconde a seção de edição
    }
}

function salvarPerfil() {
    const novoNome = document.getElementById('novoUsuario').value;
    const novaDescricao = document.getElementById('descricao').value;

    // Atualizar o conteúdo do perfil
    document.getElementById('profile-name').innerText = novoNome;
    document.getElementById('profile-description').innerText = novaDescricao;

    // Esconder a área de edição após salvar
    document.getElementById('editProfileSection').classList.add('hidden');
}