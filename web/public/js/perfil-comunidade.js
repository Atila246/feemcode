const perfil_nome = document.getElementById("perfil-nome")
const underline = document.querySelector('.underline')
const aba1 = document.getElementById("aba1")
const aba2 = document.getElementById("aba2")

const conteudos_perfil = document.querySelector(".conteudos-perfil")
const comunidades_perfil = document.querySelector(".comunidades-perfil")

const gerenciar_perfil = document.querySelector(".gerenciar-perfil")


aba1.addEventListener('click', () => {
    aba1.classList.add('ativo')
    aba2.classList.remove('ativo')
    
    underline.classList.remove('animatein')
    underline.classList.remove('animateout')

    let tamanhoAba2 = underline.style.width = `${aba2.offsetWidth}px`
    let tamanhoAba1 = underline.style.width = `${aba1.offsetWidth}px`
    underline.style.width = tamanhoAba1
  
    document.documentElement.style.setProperty('--tamanho-aba-2',tamanhoAba2)
    
    underline.classList.add('animateout')
    
    gerenciar_perfil.style.display = "none"
    conteudos_perfil.style.display = "block"    
})

aba2.addEventListener('click', () => {
    aba2.classList.add('ativo')
    aba1.classList.remove('ativo')
    
    underline.classList.remove('animateout')
    underline.classList.remove('animatein')
    
    let tamanhoAba1 = underline.style.width = `${aba1.offsetWidth}px`
    let tamanhoAba2 = underline.style.width = `${aba2.offsetWidth}px`
    underline.style.width = tamanhoAba2
    document.documentElement.style.setProperty('--tamanho-aba-1',tamanhoAba1)

    underline.classList.add('animatein')

    gerenciar_perfil.style.display = "flex"
    conteudos_perfil.style.display = "none" 
})