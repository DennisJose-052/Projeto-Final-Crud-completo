<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>loja</title>
  <style>
    * {
      box-sizing: border-box;
      font-family: 'Poppins', sans-serif;
    }

    body {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #6a0dad, #9b59b6);
    }

    .container {
      background: white;
      width: 380px;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 0 20px rgba(0,0,0,0.2);
      text-align: center;
      transition: all 0.5s ease;
    }

    h2 {
      color: #6a0dad;
      margin-bottom: 1rem;
    }

    input {
      width: 100%;
      padding: 10px;
      margin: 8px 0;
      border: 2px solid #ddd;
      border-radius: 8px;
      transition: 0.3s;
    }

    input:focus {
      border-color: #6a0dad;
      outline: none;
    }

    button {
      width: 100%;
      padding: 10px;
      background: #6a0dad;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 10px;
      transition: 0.3s;
    }

    button:hover {
      background: #8e44ad;
    }

    .link {
      margin-top: 15px;
      display: block;
      color: #6a0dad;
      cursor: pointer;
      text-decoration: underline;
      font-size: 14px;
    }

    .hidden {
      display: none;
    }

    /* Animação suave entre telas */
    .fade {
      animation: fadeIn 0.5s ease forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
  </style>
</head>
<body>
  <div class="container fade" id="loginContainer">
    <h2>bem-vindo</h2>
    <input type="text" placeholder="E-mail" id="loginEmail">
    <input type="password" placeholder="Senha" id="loginPassword">
    <button onclick="login()">Login</button>
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
      alert(`Login com:\nEmail: ${email}\nSenha: ${senha}`);
    }
                                
    function cadastrar() {
      const nome = document.getElementById('nomeCadastro').value;
      const email = document.getElementById('emailCadastro').value;
      const senha = document.getElementById('senhaCadastro').value;
      alert(`Cadastro realizado!\nNome: ${nome}\nEmail: ${email}`);
      mostrarLogin();
    }
  </script>
</body>
</html>
