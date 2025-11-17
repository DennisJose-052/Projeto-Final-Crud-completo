// Seleção dos elementos
const loginContainer = document.getElementById('loginContainer');
const cadastroContainer = document.getElementById('cadastroContainer');

const btnLogin = document.getElementById('btnLogin');
const btnCadastrar = document.getElementById('btnCadastrar');
const btnMostrarCadastro = document.getElementById('btnMostrarCadastro');
const btnMostrarLogin = document.getElementById('btnMostrarLogin');
const btnEsqueceuSenha = document.getElementById('btnEsqueceuSenha');

// Alternar telas
function mostrarCadastro() {
  loginContainer.classList.add('hidden');
  cadastroContainer.classList.remove('hidden');
}

function mostrarLogin() {
  cadastroContainer.classList.add('hidden');
  loginContainer.classList.remove('hidden');
}

// Funções de login e cadastro
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

// Redirecionar para recuperação de senha
function esqueceuSenha() {
  window.location.href = "recuperar-senha.html";
}

// Eventos
btnLogin.addEventListener("click", login);
btnCadastrar.addEventListener("click", cadastrar);
btnMostrarCadastro.addEventListener("click", mostrarCadastro);
btnMostrarLogin.addEventListener("click", mostrarLogin);
btnEsqueceuSenha.addEventListener("click", esqueceuSenha);
