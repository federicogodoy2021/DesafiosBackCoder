import { ProductModel } from "./models/productModel.js";
import { CartModel } from "./models/cartModel.js";

export default class ProductDaoMongoDB {

  async addProductToCart(productId, cartId) {
    try {
      const cart = await CartModel.findById(cartId);
        if (!cart) {
        throw new Error('Cart not found');
      }
        const product = await ProductModel.findById(productId);
        if (!product) {
        throw new Error('Product not found');
      }
        cart.products.push(product);
        await cart.save();
  
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductByTitle(title) {
    try {
      const response = await ProductModel.find({title: title})//.explain();
      return response//.executionStats;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const response = await ProductModel.findById(id)//populate('products')
      // .explain();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductByCode(code) {
    try {
      const response = await ProductModel.find({code: code})//.explain();
      return response //.executionStats;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProducts() {
    try {
      const response = await ProductModel.find({})//.explain();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      await ProductModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
