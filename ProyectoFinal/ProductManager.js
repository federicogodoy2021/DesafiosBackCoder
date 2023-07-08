import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;

    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, '[]', 'utf8');
    }
  }

  getAllProducts() {
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
          resolve(newProduct);
        });
      });
    });
  }

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
          resolve(updatedProduct);
        });
      });
    });
  }

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
        const deletedProduct = products.splice(productIndex, 1)[0];

        fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf8', err => {
          if (err) {
            reject(err);
            return;
          }
          resolve(deletedProduct);
        });
      });
    });
  }
}

export default ProductManager