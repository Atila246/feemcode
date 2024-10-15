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


