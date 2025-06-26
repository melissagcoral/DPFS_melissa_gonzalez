function showToast(mensaje) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = mensaje;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000); // 3 segundos
}


document.addEventListener('DOMContentLoaded', () => {
  renderCarrito();
  setupAddToCartButtonsFromDetail();
  setupAddToCartButtons();
  setupBuyNowButton();
  setupFormSubmission();
  //btnEditarOnClick();
});

// ----------------------
// Agregar producto al carrito
// ----------------------
function setupAddToCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach(boton => {
    boton.addEventListener('click', () => {
      const card = boton.closest('.producto-card, .card');
      if (!card) return;
      const id = boton.dataset.id;
      const nombre = card.querySelector('.producto-nombre')?.innerText || '';
      const precio = card.querySelector('.producto-precio, p')?.innerText.replace(/[^\d]/g, '') || '0';
      const imagen = card.querySelector('img')?.src || '';
      const cantidad = parseInt(document.getElementById('quantity')?.value || 1);

      let carrito = getCarrito();
      const existente = carrito.find(p => p.id === id);

      if (existente) {
        existente.cantidad += cantidad;
      } else {
        carrito.push({ id, nombre, precio: parseInt(precio), imagen, cantidad });
      }

      saveCarrito(carrito);
      alert(`${nombre} agregado al carrito`);
    });
  });
}

function setupAddToCartButtonsFromDetail() {
  // Verificamos si estamos en detail.ejs por la clase en el body o un id
  const detail = document.querySelector('.product-detail');
  if (!detail) return;

  const boton = detail.querySelector('.add-to-cart');
  if (!boton) return;

  boton.addEventListener('click', () => {
    const container = document.getElementById('product-info');
    const id = container.dataset.id;
    const imagen = container.dataset.imagen;

    const nombre = detail.querySelector('.product-title')?.innerText.trim();
    const precio = detail.querySelector('.product-price')?.innerText.replace(/[^\d]/g, '');
    const cantidad = parseInt(document.getElementById('quantity')?.value || 1);

    let carrito = getCarrito();
    const existente = carrito.find(p => p.id === id);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carrito.push({ id, nombre, precio: parseInt(precio), imagen, cantidad });
    }

    saveCarrito(carrito);
    alert(`${nombre} agregado al carrito`);
  });
}


// ----------------------
// Renderiza productos del carrito en cart.ejs
// ----------------------
function renderCarrito() {
  if (!document.querySelector('.cart-section')) return;

  const carrito = getCarrito();
  let total = 0;

  document.querySelectorAll('tbody tr').forEach(row => row.remove());

  carrito.forEach((item, i) => {
    const row = document.createElement('tr');
    row.dataset.id = item.id;
    row.innerHTML = `
      <td class="cart-product">
        <img src="${item.imagen}" alt="${item.nombre}" />
        <span>${item.nombre}</span>
      </td>
      <td>₲ ${item.precio.toLocaleString()}</td>
      <td><input type="number" class="qty-input" value="${item.cantidad}" min="1" data-index="${i}" /></td>
      <td class="line-total">₲ ${(item.precio * item.cantidad).toLocaleString()}</td>
      <td><button class="btn-remove" data-index="${i}">✖</button></td>
    `;
    document.querySelector('tbody').appendChild(row);
    total += item.precio * item.cantidad;
  });

  document.getElementById('total-general').textContent = total.toLocaleString();
  setupQuantityChange();
  setupRemoveButtons();
}

// ----------------------
// Cambia cantidades
// ----------------------
function setupQuantityChange() {
  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', () => {
      const index = input.dataset.index;
      const nuevaCantidad = Math.max(1, parseInt(input.value));
      const carrito = getCarrito();

      carrito[index].cantidad = nuevaCantidad;
      saveCarrito(carrito);
      renderCarrito();
    });
  });
}

// ----------------------
// Eliminar productos
// ----------------------
function setupRemoveButtons() {
  document.querySelectorAll('.btn-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      let carrito = getCarrito();
      carrito.splice(index, 1);
      saveCarrito(carrito);
      renderCarrito();
    });
  });
}

// ----------------------
// Comprar ahora
// ----------------------
function setupBuyNowButton() {
  document.querySelector('.btn-buy, .btn-checkout')?.addEventListener('click', () => {
    if (getCarrito().length === 0) return alert("Tu carrito está vacío.");
    alert('Compra realizada con éxito 🛒');
    localStorage.removeItem('carrito');
    location.reload();
  });
}

// ----------------------
// Guardar producto desde form (admin/new product)
// ----------------------
function setupFormSubmission() {
  const form = document.getElementById("productForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const product = {
      id: Date.now().toString(),
      nombre: form.nombre.value,
      precio: parseInt(form.precio.value.replace(/[^\d]/g, '')),
      imagen: form.imagen.value,
      descripcion: form.descripcion.value
    };

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    alert("Producto guardado");
    form.reset();
  });
}

// ----------------------
// Helpers
// ----------------------
function getCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function saveCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
