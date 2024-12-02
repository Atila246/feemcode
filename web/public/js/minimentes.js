const quiz_options = document.querySelectorAll('.quiz-option')
const resposta = document.getElementById('certa')
const botao_quiz = document.getElementById('submit-quiz')

item_quiz = {
    id: 0,
    item: {},
    estado: false
}

index = 0
list_items = []

quiz_options.forEach(item => {
    item.addEventListener('click', () => {
        item_quiz = {
            id: index++,
            item: item,
            estado: true
        }

        if(list_items.length!=0){
            var item_selecionado = list_items[0].item
            retirarSelecao(item_selecionado)
            list_items = []
        }

        list_items.push(item_quiz)
        selecionar(item)
    })
})

function selecionar(item){
    item.classList.remove('padrao')
    item.classList.remove('selecionado')
    item.classList.add('selecionado')
}

function retirarSelecao(item){
    item.classList.remove('selecionado')
    item.classList.add('padrao')
}

botao_quiz.addEventListener('click',()=>{
    if(list_items[0].item==resposta){
        addMessage(true)
    }else{
        addMessage(false)
    }
})

function addMessage(boolean){
    let mensagem = document.getElementById('mensagem')
    if(boolean){
        mensagem.innerHTML = "A resposta está certa! Meus parabéns!"
        mensagem.style.display = "block"
        mensagem.style.color = "green"
    }else{
        mensagem.innerHTML = "Ops! Você acabou errando, mas pode tentar novamente!"
        mensagem.style.display = "block"
        mensagem.style.color = "red"
    }
}
