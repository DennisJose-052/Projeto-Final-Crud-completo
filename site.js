// Produtos (estáticos)
const PRODUCTS = [
  { id:1, name:"nome", price:0.00, img:"https://via.placeholder.com/600x400/8b5cf6/fff?text=Camiseta" },
  { id:2, name:"nome", price:0.00, img:"https://via.placeholder.com/600x400/6d28d9/fff?text=Moletom" },
  { id:3, name:"nome", price:0.00, img:"https://via.placeholder.com/600x400/7c3aed/fff?text=Bon%C3%A9" },
  { id:4, name:"nome", price:0.00, img:"https://via.placeholder.com/600x400/5b21b6/fff?text=Jaqueta" },
  { id:5, name:"nome", price:0.00, img:"https://via.placeholder.com/600x400/9f7aea/fff?text=Meias" },
  { id:6, name:"nome", price:0.00, img:"https://via.placeholder.com/600x400/8b5cf6/fff?text=Pixel" },    
  { id:7, name:"nome", price:0.00, img:"https://via.placeholder.com/600x400/9333ea/fff?text=T%C3%AAnis" },
  { id:8, name:"nome", price:0.00, img:"https://via.placeholder.com/600x400/6d28d9/fff?text=Matrix" },
  { id:9, name:"nome", price:0.00, img:"https://via.placeholder.com/600x400/7c3aed/fff?text=Mochila" },
  { id:10, name:"nome", price:0.00, img:"https://via.placeholder.com/600x400/5b21b6/fff?text=Pulseira" }, 
  { id:11, name:"nome", price:0.00, img:"https://via.placeholder.com/600x400/5b21b6/fff?text=Pulseira" },
  { id:12, name:"nome", price:0.00, img:"https://via.placeholder.com/600x400/9f7aea/fff?text=Fone" } 
];

// Elementos
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
const welcome = document.getElementById('welcome');

yearEl.innerText = new Date().getFullYear();

// Cart (load/save from localStorage)
let cart = JSON.parse(localStorage.getItem('lojaGeek_cart') || '[]');

function saveCart(){
  localStorage.setItem('lojaGeek_cart', JSON.stringify(cart));
  renderCart();
}

// Render produtos
function renderProducts(){
  productsEl.innerHTML = PRODUCTS.map(p => `
    <article class="card">
      <img src="${p.img}" alt="${escapeHtml(p.name)}">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-weight:700">${escapeHtml(p.name)}</div>
            <div class="small muted">${p.name.includes('Moletom') ? 'Edição limitada' : 'Tecido confortável'}</div>
          </div>
          <div style="text-align:right">
            <div class="price">R$ ${p.price.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="small muted">Tamanhos: P M G</div>
        <button class="btn" onclick="addToCart(${p.id})" style="background:linear-gradient(90deg,var(--purple-600),var(--purple-500));color:white;border-radius:8px">Adicionar</button>
      </div>
    </article>
  `).join('');
}

// Add / remove / qty
function addToCart(productId){
  const prod = PRODUCTS.find(p => p.id === productId);
  if(!prod) return;
  const found = cart.find(i => i.id === productId);
  if(found) found.qty += 1;
  else cart.push({ id:prod.id, name:prod.name, price:prod.price, img:prod.img, qty:1 });
  saveCart();
  openDrawer();
}

function changeQty(productId, delta){
  cart = cart.map(i => i.id === productId ? {...i, qty: Math.max(1, i.qty + delta)} : i );
  saveCart();
}

function removeFromCart(productId){
  cart = cart.filter(i => i.id !== productId);
  saveCart();
}

function cartTotal(){
  return cart.reduce((s,i) => s + i.price * i.qty, 0);
}

function renderCart(){
  const count = cart.reduce((s,i)=>s + i.qty, 0);
  cartCountEl.innerText = count;

  if(cart.length === 0){
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

// Drawer controls
function openDrawer(){
  drawer.classList.add('open');
  drawerBackdrop.classList.add('show');
  drawer.setAttribute('aria-hidden','false');
}
function closeDrawerFn(){
  drawer.classList.remove('open');
  drawerBackdrop.classList.remove('show');
  drawer.setAttribute('aria-hidden','true');
}
cartBtn.addEventListener('click', openDrawer);
closeDrawer.addEventListener('click', closeDrawerFn);
drawerBackdrop.addEventListener('click', closeDrawerFn);

// Checkout placeholder
checkoutBtn.addEventListener('click', () => {
  if(cart.length === 0) return alert('Seu carrinho está vazio.');
  if(confirm(`Confirmar compra no valor de R$ ${cartTotal().toFixed(2)} ?`)){
    cart = [];
    saveCart();
    closeDrawerFn();
    alert('Compra finalizada — obrigado!');
  }
});

// ESCAPAR HTML
function escapeHtml(s){ 
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[c]);
}

// Init
function init(){
  renderProducts();
  renderCart();
  // funções globais
  window.addToCart = addToCart;
  window.changeQty = changeQty;
  window.removeFromCart = removeFromCart;
}
init();
