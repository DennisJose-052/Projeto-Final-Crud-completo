// Seleção dos elementos
const loginContainer = document.getElementById('loginContainer');
const cadastroContainer = document.getElementById('cadastroContainer');

// Alternar telas
function mostrarCadastro() {
  loginContainer.classList.add('hidden');
  cadastroContainer.classList.remove('hidden');
}

function mostrarLogin() {
  cadastroContainer.classList.add('hidden');
  loginContainer.classList.remove('hidden');
}

// Login
function login() {
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginPassword').value;

  alert(`Login:\nEmail: ${email}\nSenha: ${senha}`);
  window.location.href = "site.html";
}

// Cadastro
function cadastrar() {
  const nome = document.getElementById('nomeCadastro').value;
  const email = document.getElementById('emailCadastro').value;
  const senha = document.getElementById('senhaCadastro').value;

  alert(`Cadastro realizado!\nNome: ${nome}\nEmail: ${email}`);
  mostrarLogin();
}

// Recuperar senha
function esqueceuSenha() {
  window.location.href = "recuperar-senha.html";
}

// Mostrar / ocultar senha com ícone SVG
function toggleSenha(idCampo, elemento) {
  const campo = document.getElementById(idCampo);

  const eyeOpen = `
    <svg class="icon-eye" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
    viewBox="0 0 24 24" fill="none" stroke="#6a0dad" stroke-width="2" 
    stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `;

  const eyeClosed = `
    <svg class="icon-eye-off" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
    viewBox="0 0 24 24" fill="none" stroke="#6a0dad" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.81 21.81 0 0 1 5.06-6.94"/>
      <path d="M1 1l22 22"/>
      <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88"/>
    </svg>
  `;

  if (campo.type === "password") {
    campo.type = "text";
    elemento.innerHTML = eyeClosed;
  } else {
    campo.type = "password";
    elemento.innerHTML = eyeOpen;
  }
}
