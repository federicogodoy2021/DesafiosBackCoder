import * as service from "../services/cartServices.js";

export const addProductToCart = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const { idCart } = req.params;
    const newCartProduct = await service.addProductToCart(idProduct, idCart);
    res.json(newCartProduct);
  } catch (error) {
      next(error.message)
  }
}

export const getByIdCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await service.getByIdCart(id);
    if (!item) throw new Error("Cart not found!");
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const createCart = async (req, res, next) => {
  try {
    const cart = { ...req.body };
    const newProduct = await service.createCart(cart);
    if (!newProduct) throw new Error("Validation Error!");
    else
      res.json({
        data: newProduct,
      });
  } catch (error) {
    next(error);
  }
};
