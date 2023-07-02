const fs = require('fs');

class CartManager {
    constructor(path) {
      this.path = path;
      this.carts = [];
  
      if (fs.existsSync(path)) {
        const data = fs.readFileSync(path, 'utf8');
        this.carts = JSON.parse(data);
      } else {
        fs.writeFileSync(path, '[]', 'utf8');
      }
    }

  //Función para traer todos los carritos
  getAllCarts() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const carts = JSON.parse(data);
        resolve(carts);
      });
    });
  }

  //Función para crear un nuevo carrito
  createCart() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        let carts = JSON.parse(data);
        const lastId = carts.length > 0 ? parseInt(carts[carts.length - 1].id.substr(4)) : 0;
        const newCart = {
          id: `cart${lastId + 1}`,
          products: []
        };
        carts.push(newCart);
  
        fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf8', err => {
          if (err) {
            reject(err);
            return;
          }
          resolve(newCart);
        });
      });
    });
  }
  
  //Función para traer un carrito por su id
  getCartById(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const carts = JSON.parse(data);
        const cart = carts.find(c => c.id === id);
        if (!cart) {
          reject(new Error('Carrito no encontrado'));
          return;
        }
        resolve(cart);
      });
    });
  }

  //Función para traer todos los prductos de un carrito
  getCartProducts(cid) {
    return new Promise((resolve, reject) => {
      this.getCartById(cid)
        .then(cart => {
          const products = cart.products;
          resolve(products);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  //Función para añadir un producto por su id a un carrito por su id
  addProductToCart(cid, pid) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        let carts = JSON.parse(data);
        const cartIndex = carts.findIndex(c => c.id === cid);
        if (cartIndex === -1) {
          reject(new Error('Carrito no encontrado'));
          return;
        }
        const cart = carts[cartIndex];
        const existingProduct = cart.products.find(p => p.product == pid);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          const newProduct = { product: pid, quantity: 1 };
          cart.products.push(newProduct);
        }
  
        fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf8', err => {
          if (err) {
            reject(err);
            return;
          }
          resolve({ message: 'Producto agregado correctamente' });
        });
      });
    });
  }
     
  
}

module.exports = CartManager;
