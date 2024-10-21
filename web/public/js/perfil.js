// Obter o modal
var modal = document.getElementById("editProfileModal");

// Obter o botão que abre o modal
var btn = document.getElementById("edit-profile-btn");

// Obter o elemento <span> que fecha o modal
var span = document.getElementById("closeModal");

// Quando o usuário clica no botão, abre o modal
btn.onclick = function() {
    modal.style.display = "block";
}

// Quando o usuário clica no <span> (x), fecha o modal
span.onclick = function() {
    modal.style.display = "none";
}

// Quando o usuário clica fora do modal, fecha-o
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "nome";
    }
}

// Quando o formulário é enviado
document.getElementById("editProfileForm").onsubmit = function(event) {
    event.preventDefault(); // Impede o envio padrão

    // Captura os valores dos campos
    var username = document.getElementById("username").value;
    var description = document.getElementById("description").value;
    var profilePicture = document.getElementById("profilePicture").files[0];
    var bannerPicture = document.getElementById("bannerPicture").files[0];

    // Atualiza o nome e a descrição do perfil
    document.getElementById("profile-name").innerText = username;
    document.getElementById("profile-description").innerText = description;

    // Atualiza a foto de perfil se uma nova imagem for carregada
    if (profilePicture) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector(".profile-pic").src = e.target.result;
        }
        reader.readAsDataURL(profilePicture);
    }

    // Atualiza o banner se uma nova imagem for carregada
    if (bannerPicture) {
        var bannerReader = new FileReader();
        bannerReader.onload = function(e) {
            document.querySelector(".profile-banner-img").src = e.target.result;
        }
        bannerReader.readAsDataURL(bannerPicture);
    }

    // Fecha o modal
    modal.style.display = "none";
}
