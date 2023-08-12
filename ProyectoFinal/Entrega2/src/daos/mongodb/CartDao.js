import { getRandomDate } from "../../utils.js";
//Importacion de Modelos de carritos
import { CartModel } from "./models/cartModel.js";

export default class CartDaoMongoDB {
  //Traer carrito por su ID
  async getCartById(id) {
    try {
      const response = await CartModel.findById(id);
      console.log(response)
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  //Traer todos los carritos
  async getAllCarts() {
    try {
      const response = await CartModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  //Crear un nuevo carrito
  async createCart(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  //Actualizar un carrito por su ID
  async updateCart(id, obj) {
    try {
      await CartModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }
  //Eliminar un carrito por su ID
  async deleteCart(id) {
    try {
      const response = await CartModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  //Aggregations con filtro, agrupamiento y ordenamiento
  async aggregation1(/*city*/){
    try {
     const response = await CartModel.aggregate([
        {
        $match: { 
          //city: `${city}`,
          //buyer: "Carla"}
          city: "Rosario"}
        },
        {
        $group: {
          _id: 'buyer',
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
  //Actualizar los carritos añadiendo fecha random
  async updateNewDate(){
  try {
    const carts = await CartModel.find({});
    carts.forEach((cart)=> {
      cart.date = getRandomDate();
      cart.save()
    });
    return { message: 'updated OK' }
  } catch (error) {
    console.log(error);
  }
}
}
