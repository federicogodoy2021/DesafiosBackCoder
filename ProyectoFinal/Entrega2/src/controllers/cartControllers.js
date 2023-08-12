import * as service from "../services/cartServices.js";
//Controller para añadir un producto a un carrito
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
//Controller para traer un carrito por su ID
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
//Controller para dar de alta un nuevo carrito
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
//Aggregations con filtro, agrupamiento y ordenamiento
export const aggregation1 = async (req, res, next) => {
  try {
    //const { city } = req.query
    const response = await service.aggregation1( /*city*/ )
    res.json(response)
  } catch (error) {
    next(error.message);
  }
}
//Controller para Actualizar los carritos añadiendo fecha random
export const updateNewDate = async (req, res, next) => {
  try {
    const response = await service.updateNewDate()
    res.json(response)
  } catch (error) {
    next(error.message);
  }
}