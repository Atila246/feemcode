const get = document.getElementById('get')
const resposta = document.getElementById('resposta')

get.addEventListener('click', () => {
    
    fetch('http://localhost:3000/usuarios')
        .then(res => res.json())
        .then((data) => {
            // console.log(data)
            resposta.innerHTML = data.nome;
        })
        .catch((err) => {
            console.log("Erro"+err)
        })
})       