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

    <!-- CAMPO DE SENHA COM OLHO -->
    <div class="password-box">
      <input type="password" placeholder="Senha" id="loginPassword">
      <span class="togglePassword" onclick="toggleSenha('loginPassword', this)">
        <svg class="icon-eye" xmlns="http://www.w3.org/2000/svg" width="22" height="22" 
        viewBox="0 0 24 24" fill="none" stroke="#6a0dad" stroke-width="2" 
        stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </span>
    </div>

    <button onclick="login()">Login</button>

    <span class="link" onclick="esqueceuSenha()">Esqueceu sua senha?</span>
    <span class="link" onclick="mostrarCadastro()">Não tem conta? Cadastre-se</span>
  </div>
  
  <div class="container hidden fade" id="cadastroContainer">
    <h2>Cadastrar</h2>

    <input type="text" placeholder="Nome completo" id="nomeCadastro">
    <input type="email" placeholder="E-mail" id="emailCadastro">

    <!-- SENHA DO CADASTRO COM OLHO -->
    <div class="password-box">
      <input type="password" placeholder="Senha" id="senhaCadastro">
      <span class="togglePassword" onclick="toggleSenha('senhaCadastro', this)">
        <svg class="icon-eye" xmlns="http://www.w3.org/2000/svg" width="22" height="22" 
        viewBox="0 0 24 24" fill="none" stroke="#6a0dad" stroke-width="2" 
        stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </span>
    </div>

    <button onclick="cadastrar()">Cadastrar</button>
    <span class="link" onclick="mostrarLogin()">Já tem conta? Entrar</span>
  </div>

  <script src="login.js"></script>
</body>
</html>
