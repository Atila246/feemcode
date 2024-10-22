<?php
// Configurações de conexão ao banco de dados (se necessário)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "femmcodebd";

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email']; // Pega o e-mail do formulário

    $codigo = rand(100000, 999999); // Gera um código aleatório de 6 dígitos

    // Envio do e-mail
    $assunto = 'Seu código de verificação';
    $mensagem = 'Seu código de verificação é: ' . $codigo;
    $headers = 'From: no-reply@seusite.com' . "\r\n" .
               'Reply-To: no-reply@seusite.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    if (mail($email, $assunto, $mensagem, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}

// Fecha a conexão
$conn->close();
?>
