/*cadastrar moderador*/
btn_cadastro.addEventListener('click', () => {
    fetch('http://localhost:3000/moderador', {
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