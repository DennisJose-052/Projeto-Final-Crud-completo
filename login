<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>loja</title>
  <link rel="stylesheet" href="login.css">
</head>
<body>
  <div class="container fade" id="loginContainer">
    <h2>Bem-Vindo</h2>
    <input type="text" placeholder="E-mail" id="loginEmail">
    <input type="password" placeholder="Senha" id="loginPassword">

    <button onclick="login()">Login</button>

    <!-- AGORA É UM BOTÃO / LINK CLICÁVEL -->
    <span class="link" onclick="esqueceuSenha()">Esqueceu sua senha?</span>

    <span class="link" onclick="mostrarCadastro()">Não tem conta? Cadastre-se</span>
  </div>
  
  <div class="container hidden fade" id="cadastroContainer">
    <h2>Cadastrar</h2>
    <input type="text" placeholder="Nome completo" id="nomeCadastro">
    <input type="email" placeholder="E-mail" id="emailCadastro">
    <input type="password" placeholder="Senha" id="senhaCadastro">
    <button onclick="cadastrar()">Cadastrar</button>
    <span class="link" onclick="mostrarLogin()">Já tem conta? Entrar</span>
  </div>

  <script>
    const loginContainer = document.getElementById('loginContainer');
    const cadastroContainer = document.getElementById('cadastroContainer');

    function mostrarCadastro() {
      loginContainer.classList.add('hidden');
      cadastroContainer.classList.remove('hidden');
    }

    function mostrarLogin() {
      cadastroContainer.classList.add('hidden');
      loginContainer.classList.remove('hidden');
    }

    function login() {
      const email = document.getElementById('loginEmail').value;
      const senha = document.getElementById('loginPassword').value;
      alert(`Login:\nEmail: ${email}\nSenha: ${senha}`);
    }

    function cadastrar() {
      const nome = document.getElementById('nomeCadastro').value;
      const email = document.getElementById('emailCadastro').value;
      const senha = document.getElementById('senhaCadastro').value;
      alert(`Cadastro realizado!\nNome: ${nome}\nEmail: ${email}`);
      mostrarLogin();
    }

    function esqueceuSenha() {
      alert("Redirecionando para recuperação de senha...");
      // Aqui você pode colocar window.location.href = "sua_pagina.html";
    }
  </script>
</body>
</html>
