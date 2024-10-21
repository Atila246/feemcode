const nome_perfil = document.getElementById('profile-name')

fetch('http://localhost:3000/usuarios')
    .then(res => res.json())
    .then((data) => {
        data.forEach((item) => {
            nome_perfil.innerHTML = item.nome
        })
        .catch((err) => {
            console.log("Erro"+err)
        })
    })