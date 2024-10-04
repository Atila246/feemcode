<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificar Código</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>Verificar Código de Recuperação</h2>
        <form action="verify_code.php" method="POST">
            <label for="email">Digite seu e-mail:</label>
            <input type="email" id="email" name="email" required>

            <label for="codigo">Digite o código enviado por e-mail:</label>
            <input type="text" id="codigo" name="codigo" required>

            <button type="submit">Verificar código</button>
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

// Recebe o e-mail e o código do formulário
$email = $_POST['email'];
$codigo_inserido = $_POST['codigo'];

// Verifica o código no banco de dados
$sql = "SELECT reset_codigo, reset_expiracao FROM usuarios WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $codigo_armazenado = $row['reset_codigo'];
    $expiracao = $row['reset_expiracao'];

    // Verifica se o código é válido e se não expirou
    if ($codigo_inserido === $codigo_armazenado && strtotime($expiracao) > time()) {
        echo "Código correto. Redefina sua senha.";
    } else {
        echo "Código inválido ou expirado.";
    }
} else {
    echo "Usuário não encontrado.";
}

// Fecha a conexão
$conn->close();
?>
