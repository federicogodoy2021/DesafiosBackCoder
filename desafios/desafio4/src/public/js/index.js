const socket = io();

socket.on('products', (products) => {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach((product) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${product.name} - $${product.price}`;
    productList.appendChild(listItem);
  });
});

const addProductForm = document.getElementById('add-product-form');
const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');

addProductForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const productName = productNameInput.value.trim();
  const productPrice = parseFloat(productPriceInput.value.trim());

  if (productName && productPrice) {
    const newProduct = { name: productName, price: productPrice };
    socket.emit('addProduct', newProduct);

    productNameInput.value = '';
    productPriceInput.value = '';
  }
});
