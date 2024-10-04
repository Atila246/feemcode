<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinir Senha</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>Redefinir Senha</h2>
        <form action="reset_password.php" method="POST">
            <label for="email">Digite seu e-mail:</label>
            <input type="email" id="email" name="email" required>

            <label for="nova_senha">Digite a nova senha:</label>
            <input type="password" id="nova_senha" name="nova_senha" required>

            <button type="submit">Redefinir senha</button>
        </form>
    </div>
</body>
</html>


<?php
// Configurações de conexão ao banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "FemmCodeBD";

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Recebe o e-mail e a nova senha do formulário
$email = $_POST['email'];
$nova_senha = password_hash($_POST['nova_senha'], PASSWORD_DEFAULT); // Hash da nova senha

// Atualiza a senha no banco de dados e remove o código de recuperação
$sql = "UPDATE usuarios SET senha='$nova_senha', reset_codigo=NULL, reset_expiracao=NULL WHERE email='$email'";
if ($conn->query($sql) === TRUE) {
    echo "Senha alterada com sucesso.";
} else {
    echo "Erro ao atualizar senha: " . $conn->error;
}

// Fecha a conexão
$conn->close();
?>
