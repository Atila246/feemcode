const get = document.getElementById('get')
const resposta = document.getElementById('resposta')

get.addEventListener('click', () => {
    
    fetch('http://localhost:3000/usuarios')
        .then(res => res.json())
        .then((data) => {
            data.forEach(item => {
              console.log(item)
              resposta.innerHTML = item.nome  
            })
        })
        .catch((err) => {
            console.log("Erro"+err)
        })
})       