const perfil_nome = document.getElementById("perfil-nome")
const perfil_nome_usuario = document.getElementById("perfil-nome-usuario")

const user = JSON.parse(sessionStorage.getItem("Usuario"))
console.log(user.nomeUsuario)

fetch('http://localhost:3000/um-usuario', {
        method: 'POST',
        body: JSON.stringify({nomeUsuario: user.nomeUsuario}),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then((data) => {
        perfil_nome.innerHTML = data.nome
        perfil_nome_usuario.innerHTML += data.nomeUsuario
        console.log(data.moderador)
    })
    .catch((err) => {
        console.log("Erro"+err)
    })

/*sair*/
const sair = document.getElementById('sair')
sair.addEventListener('click', () => {
  sessionStorage.clear()
  window.location.href = "index.html"
})

/*navegação abas */
const underline = document.querySelector('.underline')
const aba1 = document.getElementById("aba1")
const aba2 = document.getElementById("aba2")

const conteudos_perfil = document.querySelector(".conteudos-perfil")
const comunidades_perfil = document.querySelector(".comunidades-perfil")
const gerenciar_perfil = document.querySelector(".gerenciar-perfil")
const postados_perfil = document.querySelector(".postados-perfil")

// aba1.addEventListener('click', () => {
//     aba1.classList.add('ativo')
//     aba2.classList.remove('ativo')
    
//     underline.classList.remove('animatein')
//     underline.classList.remove('animateout')

//     let tamanhoAba2 = `${aba2.offsetWidth}px`
//     let tamanhoAba1 = `${aba1.offsetWidth}px`
//     underline.style.width = tamanhoAba1
//     document.documentElement.style.setProperty('--tamanho-aba-2',tamanhoAba2)
    
//     underline.classList.add('animateout')

//     conteudos_perfil.style.display = "block"
//     comunidades_perfil.style.display = "none"
// })

// aba2.addEventListener('click', () => {
//     aba2.classList.add('ativo')
//     aba1.classList.remove('ativo')
    
//     underline.classList.remove('animateout')
//     underline.classList.remove('animatein')
    
//     let tamanhoAba1 = `${aba1.offsetWidth}px`
//     let tamanhoAba2 = `${aba2.offsetWidth}px`
//     underline.style.width = tamanhoAba2
//     document.documentElement.style.setProperty('--tamanho-aba-1',tamanhoAba1)

//     underline.classList.add('animatein')

//     conteudos_perfil.style.display = "none"
//     comunidades_perfil.style.display = "flex"
    
// })

// aba3.addEventListener('click', () => {
//    aba3.classList.add('ativo')
//    aba1.classList.remove('ativo')

//    underline.classList.remove('animateout')
//    underline.classList.remove('animatein')
   
//    let tamanhoAba1 = `${aba1.offsetWidth}px`
//    let tamanhoAba3 = `${aba3.offsetWidth}px`
//    underline.style.width = tamanhoAba3
//    document.documentElement.style.setProperty('--tamanho-aba-1',tamanhoAba1)
//    underline.classList.add('animatein')
   

//    conteudos_perfil.style.display = "none"
//    comunidades_perfil.style.display = "flex"
// })

aba2.addEventListener('click', () => {
    aba2.classList.remove('ativo')
    aba2.classList.add('ativo')

    aba1.classList.remove('ativo')

    conteudos_perfil.style.display = "none"
    postados_perfil.style.display = "block"

    aba2.style.cssText = 'border-radius: 0 10px 0 0 !important;'
    aba1.style.cssText = 'border-radius: 10px 0 0 0 !important;'
})

aba1.addEventListener('click', () => {
  aba1.classList.remove('ativo')
  aba1.classList.add('ativo')

  if(user.moderador){
    postados_perfil.style.display = "none"
  }else{
    comunidades_perfil.style.display = "none"
  }

  if(user.moderador){
    aba2.style.cssText = 'border-radius: 0 10px 0 0 !important;'
    aba2.classList.remove('ativo')
  }else{
    aba3.style.cssText = 'border-radius: 0 10px 0 0 !important;'
    aba3.classList.remove('ativo')
  }

  aba1.style.cssText = 'border-radius: 10px 0 0 0 !important;'
  conteudos_perfil.style.display = "block"
})

aba3.addEventListener('click', () => {
  aba3.classList.remove('ativo')
  aba3.classList.add('ativo')

  aba1.classList.remove('ativo')

  comunidades_perfil.style.display = "flex"
  conteudos_perfil.style.display = "none"

  aba1.style.cssText = 'border-radius: 10px 0 0 0 !important;'
  aba3.style.cssText = 'border-radius: 0 10px 0 0 !important;'
})

if(user.moderador){
    aba2.style.display = "flex"
    aba3.style.display = "none"

    comunidades_perfil.style.display = "none"
}

/*modal*/
var perfil_btn = document.getElementById('botao-perfil')
var editar_modal = document.getElementById('editar-usuario-modal'); 
var close_btn = document.getElementsByClassName('close');

perfil_btn.onclick = function () {
    editar_modal.style.display = "flex"
    console.log(editar_modal)
}

// Fechar POPUP e formulário ao clicar no 'X'
for (let i = 0; i < close_btn.length; i++) {
    close_btn[i].onclick = function () {
        editar_modal.style.display = "none"
    }
}

window.onclick = function (event) {
    if(event.target == editar_modal){
        editar_modal.style.display = "none"
    }      
}

//Editar perfil
function toggleEditProfile() {
    const editSection = document.getElementById('editProfileSection');
    if (editSection.classList.contains('hidden')) {
        editSection.classList.remove('hidden'); 
    } else {
        editSection.classList.add('hidden'); 
    }
}

function salvarPerfil() {
    const novoNome = document.getElementById('novoUsuario').value;
    const novaDescricao = document.getElementById('descricao').value;

    document.getElementById('profile-name').innerText = novoNome;
    document.getElementById('profile-description').innerText = novaDescricao;

    document.getElementById('editProfileSection').classList.add('hidden');
}


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
//     })
// })
//         if (body.classList.contains("dark-mode")) {
//             localStorage.setItem("theme", "dark");
//             toggleButton.innerHTML = '<i class="fi fi-sr-sun"></i>';
//         } else {
//             localStorage.setItem("theme", "light");
//             toggleButton.innerHTML = '<i class="fi fi-sr-moon"></i>';
//         }
//     })
// })  


const modoEscuroAtivado = localStorage.getItem('modoEscuro') === 'true';

if (modoEscuroAtivado) {
  document.body.classList.add('dark');
  document.getElementById('claroescuro').classList.add('dark');
}


let claroescuro = document.getElementById('claroescuro');

claroescuro.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.querySelector('.container__perfil-info').classList.toggle('dark');
  
  document.querySelectorAll('.menu__nav ul li a').forEach(link => {
    link.classList.toggle('dark');
  });
  
  document.querySelectorAll('h5').forEach(h5 => {
    h5.classList.toggle('dark');
  });
  
  document.querySelectorAll('.comunidade__post').forEach(post => {
    post.classList.toggle('dark');
  });
  
  document.querySelectorAll('.titulo-desc span').forEach(span => {
    span.classList.toggle('dark');
  });
  
  document.querySelectorAll('.video-item__desc').forEach(desc => {
    desc.classList.toggle('dark');
  });
  
  document.querySelectorAll('.video-item').forEach(video => {
    video.classList.toggle('dark');
  });
  
  document.querySelectorAll('.post-corpo').forEach(postBody => {
    postBody.classList.toggle('dark');
  });
  
  document.querySelectorAll('.perfil-post__nome #comunidade').forEach(nome => {
    nome.classList.toggle('dark');
  });
  
  document.querySelectorAll('.perfil-post__nome .temp').forEach(temp => {
    temp.classList.toggle('dark');
  });
  
  document.querySelectorAll('i[class^="fi-sr-"], i[class*=" fi-sr-"], span[class^="fi-sr-"], span[class*="fi-sr-"]').forEach(icon => {
    icon.classList.toggle('dark');
  });
  
  document.querySelectorAll('.perfil-post__nome .user').forEach(user => {
    user.classList.toggle('dark');
  });
  
  document.querySelectorAll('.modal-content').forEach(modal => {
    modal.classList.toggle('dark');
  });
  
  document.querySelectorAll('.editar__form button').forEach(button => {
    button.classList.toggle('dark');
  });
  
  document.querySelectorAll('.form-container h2').forEach(h2 => {
    h2.classList.toggle('dark');
  });
});

