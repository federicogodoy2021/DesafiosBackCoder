document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  // Obtener la lista de productos y mostrarla en la página
  socket.emit('products', (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product) => {
      const li = document.createElement('li');
      li.textContent = product.title;
      productList.appendChild(li);
    });
  });

  // Escuchar el evento de actualizar la lista de productos
  socket.on('products', (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product) => {
      const li = document.createElement('li');
      li.textContent = product.title;
      productList.appendChild(li);
    });
  });

  // Manejar el envío del formulario de agregar producto
  const productForm = document.getElementById('product-form');
  const productTitleInput = document.getElementById('product-title');

  productForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = productTitleInput.value.trim();
    if (title !== '') {
      socket.emit('addProduct', { title });
      productTitleInput.value = '';
    }
  });
});
