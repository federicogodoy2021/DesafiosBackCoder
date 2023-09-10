//Utilización MongoDB como DB
import CartDaoMongoDB from "../daos/mongodb/CartDao.js";
const CartsDao = new CartDaoMongoDB();

//Servicio para traer un carrito por su ID
export const getByIdCart = async (id) => {
  try {
    const item = await CartsDao.getCartById(id);
    if (!item) throw new Error("Cart not found!");
    else return item;
  } catch (error) {
    console.log(error);
  }
};
//Servicio para crear un nuevo carrito
export const createCart = async (obj) => {
  try {
    const newCart = await CartsDao.createCart(obj);
    if (!newCart) throw new Error("Validation Error!");
    else return newCart;
  } catch (error) {
    console.log(error);
  }
};
//Servicio para actualizar un carrito por su ID
export const updateCart = async (id, obj) => {
  try {
    let item = await CartsDao.getCartById(id);
    if (!item) {
      throw new Error("Cart not found!");
    } else {
      const cartUpdated = await CartsDao.updateCart(id, obj);
      return cartUpdated;
    }
  } catch (error) {
    console.log(error);
  }
};
//Servicio para eliminar un carrito por su ID
export const deleteCart = async (id) => {
  try {
    const cartDeleted = await CartsDao.deleteCart(id);
    return cartDeleted;
  } catch (error) {
    console.log(error);
  }
}
//Aggregations con filtro, agrupamiento y ordenamiento
export const aggregation1 = async(/*city*/) => {
   try {
      const aggregate = await CartsDao.aggregation1(/*city*/);
      return aggregate
    } catch (error) {
      console.log(error);
    }
}
//Actualizar los carritos añadiendo fecha random
export const updateNewDate = async() => {
  try {
    const response = CartsDao.updateNewDate()
    return response
  } catch (error) {
    console.log(error);
  }
}

// Eliminar un producto del carrito
export const deleteProductFromCart = async (cid, pid) => {
  try {
    const cart = await CartsDao.deleteProductFromCart(cid, pid);
    return cart;
  } catch (error) {
    console.log(error);
  }
}

// Actualizar el carrito con un arreglo de productos
export const updateProductsOnCart = async (cid, products) => {
  try {
    const cart = await CartsDao.updateProductsOnCart(cid, products);
    return cart;
  } catch (error) {
     console.log(error);
  }
}

// Actualizar la cantidad de ejemplares de un producto en el carrito
export const updateProductQuantity = async (cid, pid, quantity) => {
  try {
    const cart = await CartsDao.updateProductQuantity(cid, pid, quantity);
    return cart;
  } catch (error) {
    console.log(error);
  }
}

// Eliminar todos los productos del carrito
export const deleteAllProductsFromCart = async (cid) => {
  try {
    const cart = await CartsDao.deleteAllProductsFromCart(cid);
    return cart;
  } catch (error) {
    console.log(error);
  }
}