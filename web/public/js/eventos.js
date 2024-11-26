let obj = sessionStorage.getItem("Usuario")
console.log(obj)

window.onload = function(){
    if(obj!=null){
        let perfil = document.getElementById("cadastrado")
        perfil.style.cssText='display: block;'
        let botao = document.getElementById("cadastre-se")
        botao.style.cssText='display: none;'

        let link = document.getElementById("link-cadastro")
        link.href="perfil.html"
    }
}