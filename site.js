// ----- CARREGAR PRODUTOS DO CRUD -----
let PRODUCTS = JSON.parse(localStorage.getItem("lojaGeek_products") || "[]");

// ----- ELEMENTOS DO DOM -----
const productsEl = document.getElementById('products');
const cartBtn = document.getElementById('cartBtn');
const cartCountEl = document.getElementById('cartCount');
const drawer = document.getElementById('drawer');
const drawerBackdrop = document.getElementById('drawerBackdrop');
const cartList = document.getElementById('cartList');
const cartTotalEl = document.getElementById('cartTotal');
const closeDrawer = document.getElementById('closeDrawer');
const checkoutBtn = document.getElementById('checkoutBtn');
const yearEl = document.getElementById('year');

yearEl.innerText = new Date().getFullYear();

// ----- CARRINHO -----
let cart = JSON.parse(localStorage.getItem('lojaGeek_cart') || '[]');

function saveCart() {
  localStorage.setItem('lojaGeek_cart', JSON.stringify(cart));
  renderCart();
}

// ----- RENDERIZAÇÃO DE PRODUTOS -----
function renderProducts(list = PRODUCTS) {

  // Se não houver produtos no CRUD:
  if (list.length === 0) {
    productsEl.innerHTML = `
      <div style="padding:20px;font-size:18px;color:#555">
        Nenhum produto encontrado.<br>
        Vá até o <strong>Painel Admin</strong> e cadastre novos produtos.
      </div>
    `;
    return;
  }

  productsEl.innerHTML = '';

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${escapeHtml(p.name)}">

      <div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:700">${escapeHtml(p.name)}</div>
          <div class="small muted">${p.category}</div>
        </div>
        <div style="text-align:right">
          <div class="price">R$ ${p.price.toFixed(2)}</div>
        </div>
      </div>

      <div style="margin-top:8px;text-align:center">
        <button class="btn"
          onclick="addToCart(${p.id})"
          style="background:linear-gradient(90deg,var(--purple-600),var(--purple-500));color:white;border-radius:8px">
          Adicionar ao carrinho
        </button>
      </div>
    `;
    productsEl.appendChild(card);
  });
}

// ----- FUNÇÕES DO CARRINHO -----
function addToCart(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const found = cart.find(i => i.id === productId);
  if (found) found.qty += 1;
  else cart.push({ ...prod, qty: 1 });

  saveCart();
  openDrawer();
}

function changeQty(productId, delta) {
  cart = cart.map(i =>
    i.id === productId
      ? { ...i, qty: Math.max(1, i.qty + delta) }
      : i
  );
  saveCart();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
}

function cartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function renderCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  cartCountEl.innerText = count;

  if (cart.length === 0) {
    cartList.innerHTML = '<div class="muted" style="padding:18px 0">Seu carrinho está vazio.</div>';
  } else {
    cartList.innerHTML = cart.map(i => `
      <div class="cart-item">
        <img src="${i.img}" alt="${escapeHtml(i.name)}">
        <div style="flex:1">
          <div style="font-weight:700">${escapeHtml(i.name)}</div>
          <div class="small">R$ ${i.price.toFixed(2)}</div>
          <div style="margin-top:8px;display:flex;align-items:center;gap:8px">
            <div class="qty-controls">
              <button class="btn" onclick="changeQty(${i.id}, -1)">-</button>
              <span style="padding:6px 10px;border-radius:8px;border:1px solid #eee">${i.qty}</span>
              <button class="btn" onclick="changeQty(${i.id}, 1)">+</button>
            </div>
            <button class="btn" style="color:#dc2626" onclick="removeFromCart(${i.id})">Remover</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  cartTotalEl.innerText = 'R$ ' + cartTotal().toFixed(2);
}

// ----- DRAWER -----
function openDrawer() {
  drawer.classList.add('open');
  drawerBackdrop.classList.add('show');
  drawer.setAttribute('aria-hidden', 'false');
}

function closeDrawerFn() {
  drawer.classList.remove('open');
  drawerBackdrop.classList.remove('show');
  drawer.setAttribute('aria-hidden', 'true');
}

cartBtn.addEventListener('click', openDrawer);
closeDrawer.addEventListener('click', closeDrawerFn);
drawerBackdrop.addEventListener('click', closeDrawerFn);

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return alert('Seu carrinho está vazio.');

  if (confirm(`Confirmar compra no valor de R$ ${cartTotal().toFixed(2)} ?`)) {
    cart = [];
    saveCart();
    closeDrawerFn();
    alert('Compra finalizada — obrigado!');
  }
});

// ----- FILTRO DE CATEGORIA -----
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    if (category === 'all') renderProducts(PRODUCTS);
    else renderProducts(PRODUCTS.filter(p => p.category === category));
  });
});

// ----- ESCAPAR HTML -----
function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]
  );
}

// ----- INICIALIZAÇÃO -----
function init() {
  PRODUCTS = JSON.parse(localStorage.getItem("lojaGeek_products") || "[]"); // atualiza ao iniciar
  renderProducts();
  renderCart();
  window.addToCart = addToCart;
  window.changeQty = changeQty;
  window.removeFromCart = removeFromCart;
}
init();
