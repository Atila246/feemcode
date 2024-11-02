
const btnSignin = document.getElementById("signin");
const btnSignup = document.getElementById("signup");
const body = document.querySelector("body");

btnSignin.addEventListener("click", () => {
    body.classList.remove("sign-up-js"); // Remove a classe sign-up-js se estiver presente
    body.classList.add("sign-in-js");    // Adiciona a classe sign-in-js
});

btnSignup.addEventListener("click", () => {
    body.classList.remove("sign-in-js"); // Remove a classe sign-in-js se estiver presente
    body.classList.add("sign-up-js");    // Adiciona a classe sign-up-js
});

const email = document.getElementById("email")
const senha = document.getElementById("senha")
const btn_login = document.getElementById("btn-login")


btn_login.addEventListener('click', () => {

    fetch('http://localhost:3000/login', {
      method: "POST",
      body: JSON.stringify({email: email.value, senha: senha.value}),
      headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })

})




