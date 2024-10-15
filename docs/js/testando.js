const get = document.getElementById('get')
const resposta = document.getElementById('resposta')

console.log(resposta)

get.addEventListener('click', () => {
    
    fetch('http://localhost:3000/usuarios')
        .then(res => res.json())
        .then((data) => {
            resposta.innerHTML = data;
        })
        .catch((err) => {
            console.log("Erro"+err)
        })
})       