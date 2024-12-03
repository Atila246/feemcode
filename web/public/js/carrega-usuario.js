//carregando usuário
window.onload = function(){
    let obj = sessionStorage.getItem("Usuario")
    if(obj){
        let perfil = document.getElementById("cadastrado")
        perfil.style.cssText='display: block;'

        let botao = document.getElementById("cadastre-se")
        botao.style.cssText='display: none;'

        let link = document.getElementById("link-cadastro")
        link.href="perfil-usuario.html"
    }
}