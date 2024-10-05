const config_post1 = document.getElementById('config-post1');
const config_post2 = document.getElementById('config-post2');
const config_post3 = document.getElementById('config-post3');

const options_post1 = document.getElementById('options-post1');
const options_post2 = document.getElementById('options-post2');
const options_post3 = document.getElementById('options-post3');
let ligado = false;

config_post1.addEventListener("click", () => {
    if(!ligado){
        options_post1.style.display = "flex";
        ligado = true;
    }else{
        options_post1.style.display = "none";
        ligado = false;
    }
});

config_post2.addEventListener("click", () => {
    if(!ligado){
        options_post2.style.display = "flex";
        ligado = true;
    }else{
        options_post2.style.display = "none";
        ligado = false;
    }
});

config_post3.addEventListener("click", () => {
    if(!ligado){
        options_post3.style.display = "flex";
        ligado = true;
    }else{
        options_post3.style.display = "none";
        ligado = false;
    }
});


console.log("Ola");



