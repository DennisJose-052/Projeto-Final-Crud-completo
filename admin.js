// ========================
// CARREGAR PRODUTOS
// ========================
let products = JSON.parse(localStorage.getItem("lojaGeek_products") || "[]");

// Referências
const form = document.getElementById("productForm");
const table = document.getElementById("productTable");

const id = document.getElementById("id");
const nameEl = document.getElementById("name");
const priceEl = document.getElementById("price");
const imgEl = document.getElementById("img");
const categoryEl = document.getElementById("category");

// ========================
// SALVAR NO LOCALSTORAGE
// ========================
function save() {
  localStorage.setItem("lojaGeek_products", JSON.stringify(products));
  render();
}

// ========================
// ADICIONAR / EDITAR PRODUTO
// ========================
form.addEventListener("submit", e => {
  e.preventDefault();

  if (id.value) {
    // EDITAR
    const index = products.findIndex(p => p.id == id.value);
    products[index] = {
      id: Number(id.value),
      name: nameEl.value,
      price: Number(priceEl.value),
      img: imgEl.value,
      category: categoryEl.value
    };
  } else {
    // CRIAR
    const newProduct = {
      id: Date.now(),
      name: nameEl.value,
      price: Number(priceEl.value),
      img: imgEl.value,
      category: categoryEl.value
    };
    products.push(newProduct);
  }

  save();
  form.reset();
  id.value = "";
});

// ========================
// CARREGAR PRODUTO PARA EDIÇÃO
// ========================
function editProduct(prod) {
  id.value = prod.id;
  nameEl.value = prod.name;
  priceEl.value = prod.price;
  imgEl.value = prod.img;
  categoryEl.value = prod.category;
}

// ========================
// REMOVER PRODUTO
// ========================
function deleteProduct(prodId) {
  if (!confirm("Deseja realmente excluir este produto?")) return;

  products = products.filter(p => p.id !== prodId);
  save();
}

// ========================
// RENDERIZAR TABELA
// ========================
function render() {
  table.innerHTML = "";

  products.forEach(p => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>R$ ${p.price.toFixed(2)}</td>
      <td>${p.category}</td>
      <td><img src="${p.img}" width="50"></td>
      <td>
        <button class="btn-edit" onclick='editProduct(${JSON.stringify(p)})'>Editar</button>
        <button class="btn-delete" onclick="deleteProduct(${p.id})">Excluir</button>
      </td>
    `;

    table.appendChild(tr);
  });
}

render();
