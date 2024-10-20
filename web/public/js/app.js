
// Seleciona os botões e o elemento body
const btnSignin = document.querySelector("#signin");
const btnSignup = document.querySelector("#signup");
const body = document.querySelector("body");

// Adiciona o evento de clique para o botão de Sign In
btnSignin.addEventListener("click", () => {
    body.classList.remove("sign-up-js"); // Remove a classe sign-up-js se estiver presente
    body.classList.add("sign-in-js");    // Adiciona a classe sign-in-js
});

// Adiciona o evento de clique para o botão de Sign Up
btnSignup.addEventListener("click", () => {
    body.classList.remove("sign-in-js"); // Remove a classe sign-in-js se estiver presente
    body.classList.add("sign-up-js");    // Adiciona a classe sign-up-js
});

const entrarButton = document.getElementById('entrar');
const passwordInput = document.getElementById('password');

entrarButton.addEventListener('click', (e) => {
  const password = passwordInput.value;
  if (password.length < 8) {
    alert('A senha deve ter pelo menos 8 caracteres!');
    e.preventDefault();
  }
});



