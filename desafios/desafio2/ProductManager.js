const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;

    // Verificar si el archivo existe, si no, crearlo con un arreglo vacío
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, '[]', 'utf8');
    }
  }

  // Método para agregar un producto al archivo
  addProduct(product) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const products = JSON.parse(data);
        const lastId = products.length > 0 ? products[products.length - 1].id : 0;
        const newProduct = {
          id: lastId + 1,
          ...product
        };
        products.push(newProduct);

        fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf8', err => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
    });
  }

  // Método para obtener todos los productos del archivo
  getProducts() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const products = JSON.parse(data);
        resolve(products);
      });
    });
  }


  // Método para obtener un producto por su ID
  getProductById(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const products = JSON.parse(data);
        const product = products.find(p => p.id === id);
        if (!product) {
          reject(new Error('Producto no encontrado'));
          return;
        }
        resolve(product);
      });
    });
  }

  // Método para actualizar un producto por su ID
  updateProduct(id, updatedFields) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const products = JSON.parse(data);
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex === -1) {
          reject(new Error('Producto no encontrado'));
          return;
        }
        const updatedProduct = {
          ...products[productIndex],
          ...updatedFields
        };
        products[productIndex] = updatedProduct;

        fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf8', err => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
    });
  }

  // Método para eliminar un producto por su ID
  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const products = JSON.parse(data);
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex === -1) {
          reject(new Error('Producto no encontrado'));
          return;
        }
        products.splice(productIndex, 1);

        fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf8', err => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
    });
  }
}

// Crear una instancia de ProductManager
const productManager = new ProductManager('./products.json');

// Pruebas
productManager
  .getProducts()
  .then(products => {
    console.log('Productos:', products);

    return productManager.addProduct({
      title: 'Producto de prueba',
      description: 'Este es un producto de prueba',
      price: 200,
      thumbnail: 'Sin imagen',
      code: 'abc123',
      stock: 25
    });
  })
  .then(() => {
    return productManager.getProducts();
  })
  .then(products => {
    console.log('Productos después de agregar uno:', products);

    return productManager.getProductById(1);
  })
  .then(product => {
    console.log('Producto encontrado por ID:', product);

    return productManager.updateProduct(1, {
      price: 300,
      stock: 30
    });
  })
  .then(() => {
    return productManager.getProductById(1);
  })
  .then(updatedProduct => {
    console.log('Producto actualizado:', updatedProduct);

    return productManager.deleteProduct(1);

  })
  .then(() => {
    console.log('Producto eliminado exitosamente');
  })
  .catch(err => {
    console.error('Error:', err.message);
  });

  