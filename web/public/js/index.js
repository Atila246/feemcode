

// declaração de variáveis
const controls = document.querySelectorAll(".control");
const items = document.querySelectorAll(".carrossa-item");
const maxItems = items.length;
// passando pro item do meio
let currentItem = parseInt(maxItems/2);

// animação de rolagem dos itens do carroça
items[currentItem].scrollIntoView({
    inline:"center",
    behavior:"smooth",
    block:"center"
});

// adicionando o currentitem no item q estiver no meio
items[currentItem].classList.add("current-item");

// começando a percorrer os butoes
controls.forEach((control) => {
    control.addEventListener("click", () => {

        //verificando se é o botao da esquerda para rolar
        const isLeft = control.classList.contains("arrow-left");
        if(isLeft){
            currentItem--;
        }else{
            currentItem++;
        }

        // verificando se o cu chegou ao ultimo item (+1 direita), ai reseta 
        if(currentItem>=maxItems){
            currentItem=0;
        }

        // verificando se ele chegou no primeiro item(-1 esquerda), aí reseta
        if(currentItem<0){
            currentItem=maxItems-1;
        }

        // removendo o cu de um item
        items.forEach((item) => {
            item.classList.remove("current-item");
        });
        //passando o item (animaçãozinha)
        items[currentItem].scrollIntoView({
            inline:"center",
            behavior:"smooth",
            block:"center"
        });
        // adicionando no próximo intem
        items[currentItem].classList.add("current-item");

        console.log(control);
    });
});

let claroescuro = document.getElementById('claroescuro');

// Verificar o estado do modo escuro no localStorage ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('modoEscuro') === 'true') {
    document.body.classList.add('dark');
    toggleDarkModeElements();
  }
});

claroescuro.addEventListener('click', () => {
  // Alternar a classe 'dark' no body
  document.body.classList.toggle('dark');
  
  // Alternar a classe 'dark' nos elementos especificados
  toggleDarkModeElements();

  // Salvar o estado do modo escuro no localStorage
  const modoEscuroAtivado = document.body.classList.contains('dark');
  localStorage.setItem('modoEscuro', modoEscuroAtivado);
});

// Função para alternar a classe 'dark' nos elementos específicos
function toggleDarkModeElements() {
  document.querySelectorAll('.container-main').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.carrossa-item').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.header-titulo h2').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.item__header p').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.header-titulo button').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.comunidade-item').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.evento-item').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.canal-item').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.comunidade-item h4').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.evento-desc p').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.perfil-canal span').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.comunidade__carrossel h4').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.equipe-item h4').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.equipe-item').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.equipe-item__desc').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.historia-text h2').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.historia-text p').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.titulo-desc span').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.evento-local span').forEach(item => {
    item.classList.toggle('dark');
  });

  document.querySelectorAll('.evento-local span i').forEach(item => {
    item.classList.toggle('dark');
  });
}
