
const btnSignin = document.getElementById("signin");
const btnSignup = document.getElementById("signup");
const body = document.querySelector("body");

const email_login = document.getElementById("email_login")
const senha_login = document.getElementById("senha_login")
const btn_login = document.getElementById("btn-login")
const mensagem = document.getElementById("mensagem")

const email_cadastro = document.getElementById("email_cadastro")
const senha_cadastro = document.getElementById("senha_cadastro")
const nome_cadastro = document.getElementById("nome_cadastro")
const nome_usuario = document.getElementById("nome_usuario")
const btn_cadastro = document.getElementById("btn-cadastro")

const sheet = document.styleSheets[0]

btnSignin.addEventListener("click", () => {
    body.classList.remove("sign-up-js"); // Remove a classe sign-up-js se estiver presente
    body.classList.add("sign-in-js");// Adiciona a classe sign-in-js

    sheet.insertRule(`.content::before { border-radius: 0px 10px 10px 0px; }`, sheet.cssRules.length)
});

btnSignup.addEventListener("click", () => {
    body.classList.remove("sign-in-js"); // Remove a classe sign-in-js se estiver presente
    body.classList.add("sign-up-js");    // Adiciona a classe sign-up-js

    sheet.insertRule(`.content::before { border-radius: 10px 0px 0px 10px; }`, sheet.cssRules.length)
})

btn_login.addEventListener('click', () => {
  fetch('http://localhost:3000/login', {
    method: "POST",
    body: JSON.stringify({email: email_login.value, senha: senha_login.value}),
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
  })
  .then(res => res.json())
  .then((data) => {
    if(data!=null){
      sessionStorage.setItem("Usuario", JSON.stringify(data))
      console.log(JSON.stringify(data))
      window.location.href='index.html'
    }else{
      mensagem.style = "display:block;"
      mensagem.innerHTML = "E-mail ou senha incorreto(s)"
    }
  })
  .catch(err => {
    console.log(err)
  })

})


btn_cadastro.addEventListener('click', () => {
    fetch('http://localhost:3000/usuario', {
      method: "POST",
      body: JSON.stringify({nome: nome_cadastro.value, email: email_cadastro.value, senha: senha_cadastro.value, nomeUsuario: nome_usuario.value}),
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then((data) => {
      sessionStorage.setItem("Usuario", JSON.stringify(data))
      console.log(JSON.stringify(data))
      window.location.href='index.html'
    })
    .catch(err => {
      console.log(err)
    })
})



