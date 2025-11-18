// Produtos (estáticos)
const PRODUCTS = [
  { id:1, name:"Xícara Marvel", price:49.99, img:"https://www.toquedecorativo.com.br/wp-content/uploads/2022/04/babcb74b70.jpg" },
  { id:2, name:"Camisa Homem Aranha", price:69.99, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKkVOOSc13j2rTgORv6BulX6yVUElMKsiJaw&s" },
  { id:3, name:"Moletom Marvel", price:249.49, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqNVl6UxIWruxTP277LAS4OaCpB8kvbePbUw&s" },
  { id:4, name:"Boné Vingadores", price:79.99, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Ia11AHxHF1nvlzXjaPhcYl0C8ZlOxUv9hw&s" },
  { id:5, name:"Jaqueta Goku", price:149.99, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuLzTLKV8ETxd9z0YUcIm0uKE3rnb3Ix7UDQ&s" },
  { id:6, name:"Meia Sonic (PAR)", price:69.99, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrNEhpKBSABMLVrwhBq2uchKoPANeaomTcQ&s" },    
  { id:7, name:"Mochila Vingadores", price:179.99, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDg-ilmbLCMBTawBc3p2Wb0IUDO56GAYsMUw&s" },
  { id:8, name:"Blusa Matrix", price:69.99, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOzw6C01wsQHdHvxJlR948_EP-bOn9fwrtRg&s" },
  { id:9, name:"Pop Funko Doutor estranho", price:109.99, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfBH1XvhoDbMfdxJVlxmfsHp1gfr13ATrFmA&s" },
  { id:10, name:"Pop Funko Capitão America", price:109.99, img:"https://cdn.awsli.com.br/600x700/84/84034/produto/230462615/funko-pop--marvel-wwii-ultimates-captain-america-821-exclusivo-c-1--800-cv8eq0wscv.jpg" }, 
  { id:11, name:"Pop Funko Homem de Ferro", price:109.99, img:"https://m.media-amazon.com/images/I/81CnvOG8+YL.jpg" },
  { id:12, name:"Pop Funko Thanos", price:109.99, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4bo4VPvkjfuvbNMteMADnXgoytoT7qWqP2VMuEP4Mkf6vsun8MK-WV6wW89JYQEglMAc&usqp=CAU" } 
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
