//carregando usuário
window.onload = function(){
    let obj = sessionStorage.getItem("Usuario")
    if(obj){
        let perfil = document.getElementById("cadastrado")
        let icon_cadastrado = document.getElementById("icon-cadastrado")
        icon_cadastrado.style.cssText='display: flex;'
        perfil.style.cssText='display: flex;'

        let botao = document.getElementById("cadastre-se")
        botao.style.cssText='display: none;'

        let link = document.getElementById("link-cadastro")
        link.href="perfil-usuario.html"
    }
}