<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $paciente = htmlspecialchars($_POST['paciente']);
    $sexo = htmlspecialchars($_POST['sexo']);
    $genero = htmlspecialchars($_POST['genero']);
    $rg = htmlspecialchars($_POST['rg']);
    $cns = htmlspecialchars($_POST['cns']);
    $dataNascimento = htmlspecialchars($_POST['data-nascimento']);
    $telefone = htmlspecialchars($_POST['telefone']);
    $nomeMae = htmlspecialchars($_POST['nome-mae']);
    $cep = htmlspecialchars($_POST['cep']);
    $endereco = htmlspecialchars($_POST['endereco']);
    $numero = htmlspecialchars($_POST['numero']);
    $bairro = htmlspecialchars($_POST['bairro']);
    $cidade = htmlspecialchars($_POST['cidade']);
    $estado = htmlspecialchars($_POST['estado']);
    $email = htmlspecialchars($_POST['email']);
    $doenca = htmlspecialchars($_POST['doenca']);


    echo "Dados recebidos com sucesso!";
} else {
    echo "Método inválido!";
}
?>
