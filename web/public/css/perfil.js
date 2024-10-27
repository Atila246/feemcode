// Função para alternar a visibilidade da área de edição de perfil
function toggleEditProfile() {
    const editSection = document.getElementById('editProfileSection');
    if (editSection.classList.contains('hidden')) {
        editSection.classList.remove('hidden'); // Mostra a seção de edição
    } else {
        editSection.classList.add('hidden'); // Esconde a seção de edição
    }
}

function salvarPerfil() {
    const novoNome = document.getElementById('novoUsuario').value;
    const novaDescricao = document.getElementById('descricao').value;

    // Atualizar o conteúdo do perfil
    document.getElementById('profile-name').innerText = novoNome;
    document.getElementById('profile-description').innerText = novaDescricao;

    // Esconder a área de edição após salvar
    document.getElementById('editProfileSection').classList.add('hidden');
}
