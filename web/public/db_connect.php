<?php
// Configurações de conexão ao banco de dados
$servername = "localhost";
$username = "root";
$password = ""; // A senha padrão do Laragon geralmente é vazia
$dbname = "feemcodebd"; // Nome correto do banco de dados

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
} else {
    echo "Conexão bem-sucedida!";
}
?>
