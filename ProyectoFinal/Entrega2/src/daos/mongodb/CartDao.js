import { CartModel } from "./models/cartModel.js";

export default class CartDaoMongoDB {

  async getCartById(id) {
    try {
      const response = await CartModel.findById(id);
      console.log(response)
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCarts() {
    try {
      const response = await CartModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCart(id, obj) {
    try {
      await CartModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(id) {
    try {
      const response = await CartModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
