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



