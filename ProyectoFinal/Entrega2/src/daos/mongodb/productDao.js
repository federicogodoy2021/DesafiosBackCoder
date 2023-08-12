//Importacion de Modelos de carritos y productos
import { ProductModel } from "./models/productModel.js";
import { CartModel } from "./models/cartModel.js";

export default class ProductDaoMongoDB {

  //Añadir un producto al carrito
  async addProductToCart(productId, cartId) {
    try {
      const cart = await CartModel.findById(cartId);
        if (!cart) {
        throw new Error('Cart not found');
      }
        const product = await ProductModel.findById(productId);
        cart.products.push(product);
        await cart.save();
  
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  //Traer un producto por su titulo
  async getProductByTitle(title) {
    try {
      const response = await ProductModel.find({title: title})//.explain();
      return response//.executionStats;
    } catch (error) {
      console.log(error);
    }
  }
  //Traer un producto por su ID
  async getProductById(id) {
    try {
      const response = await ProductModel.findById(id)//populate('products')
      // .explain();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  //Traer un producto por su codigo
  async getProductByCode(code) {
    try {
      const response = await ProductModel.find({code: code})//.explain();
      return response //.executionStats;
    } catch (error) {
      console.log(error);
    }
  }
  //Crear un nuevo producto
  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  //Actualizar un campo de un producto por su ID
  async updateProduct(id, obj) {
    try {
      await ProductModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }
  //Eliminar un producto por su ID
  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  //Aggregations con filtro, agrupamiento y ordenamiento
  async aggregation1(/*code*/){
    try {
     const response = await ProductModel.aggregate([
        {
        $match: { 
          //code: `${code}`,
          category: "Electronics"
        }
        },
        {
        $group: {
          _id: 'category',
          //averageCity: {$avg: '$city'}
          count:{$sum: 1}

        } //,
        //$sort: {
          //average_age: 1
        //}
      }
      ])
      return response
    } catch (error) {
      console.log(error)
    }
  }
  //Traer todos los productos con metodo de paginación
  async getAllProducts(page = 1, limit = 10) {
    try {

      const response = await ProductModel.paginate({},{ page, limit })
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
