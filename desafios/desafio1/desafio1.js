class ProductManager {
    constructor() {
      this.products = [];
      this.currentId = 1;
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
      // Validar que todos los campos sean obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios.");
        return;
      }
  
      // Validar que no se repita el campo "code"
      const existingProduct = this.products.find(product => product.code === code);
      if (existingProduct) {
        console.log("Ya existe un producto con el mismo código.");
        return;
      }
  
      // Agregar el producto al arreglo con un id autoincrementable
      const newProduct = {
        id: this.currentId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
      this.products.push(newProduct);
      this.currentId++;
  
      console.log("Producto agregado:", newProduct);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        console.log("Producto no encontrado.");
      }
    }
  }

  /* ---------------------- Instancia para probar metodos --------------------- */

  // Paso 1: Crear una instancia de la clase ProductManager
const productManager = new ProductManager();

// Paso 2: Llamar a "getProducts" recién creada la instancia, debe devolver un arreglo vacío []
const productsEmpty = productManager.getProducts();
console.log("Productos vacíos:", productsEmpty);

// Paso 3: Llamar al método "addProduct" con los campos proporcionados
productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
});

// Paso 4: Verificar que el objeto se haya agregado satisfactoriamente con un id generado automáticamente SIN REPETIRSE
const productsAfterAdd = productManager.getProducts();
console.log("Productos después de agregar el primero:", productsAfterAdd);

// Paso 5: Llamar al método "addProduct" con los mismos campos para verificar el error por código repetido
productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
});

// Paso 6: Verificar que el producto no se agregue debido a que el código está repetido
const productsAfterDuplicateAdd = productManager.getProducts();
console.log("Productos después de agregar el duplicado:", productsAfterDuplicateAdd);

// Paso 7: Evaluar que "getProductById" devuelva error si no encuentra el producto o el producto en caso de encontrarlo
const productNotFound = productManager.getProductById(999);
console.log("Producto no encontrado:", productNotFound);

const productFound = productManager.getProductById(1);
console.log("Producto encontrado:", productFound);

