const eventos = document.querySelectorAll(".evento-item")
eventos.forEach(evento => {
    evento.addEventListener('click', () => {
        window.location.href = "evento.html"
    })
})