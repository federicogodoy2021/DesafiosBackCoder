import CartDaoMongoDB from "../daos/mongodb/CartDao.js";
const CartsDao = new CartDaoMongoDB();

export const getByIdCart = async (id) => {
  try {
    const item = await CartsDao.getCartById(id);
    if (!item) throw new Error("Cart not found!");
    else return item;
  } catch (error) {
    console.log(error);
  }
};

export const createCart = async (obj) => {
  try {
    const newCart = await CartsDao.createCart(obj);
    if (!newCart) throw new Error("Validation Error!");
    else return newCart;
  } catch (error) {
    console.log(error);
  }
};

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

export const deleteCart = async (id) => {
  try {
    const cartDeleted = await CartsDao.deleteCart(id);
    return cartDeleted;
  } catch (error) {
    console.log(error);
  }
};
