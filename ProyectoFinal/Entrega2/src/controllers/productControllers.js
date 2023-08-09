import * as service from "../services/productServices.js";

export const createFileController = async (req, res, next) => {
  try {
    const newProducts = await service.createFileProducts();
    if (!newProducts) throw new Error("Validation Error!");
    else res.json(newProducts);
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const { idProduct } = req.params;
    const newProductCart = await service.addProductToCart(idCart, idProduct);
    res.json(newProductCart);
  } catch (error) {
      next(error.message)
  }
}


export const getByTitleController = async (req, res, next) => {
  try {
    const { title } = req.query;
    const item = await service.getByTitleProduct(title);
    if (!item) throw new Error("Product not found!");
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await service.getByIdProduct(id);
    if (!item) throw new Error("Product not found!");

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getByCodeController = async (req, res, next) => {
  try {
    const { code } = req.params;
    const item = await service.getByCodeProduct(code);
    if (!item) throw new Error("Product not found!");
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getAllController = async (req, res, next) => {
  try {
    const items = await service.getAllProducts();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const createController = async (req, res, next) => {
  try {
    const product = { ...req.body };
    const newProduct = await service.createProduct(product);
    if (!newProduct) throw new Error("Validation Error!");
    else
      res.json({
        data: newUser,
      });
  } catch (error) {
    next(error);
  }
};

export const updateController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price, stock } = req.body;

    let item = await getByIdProduct(id);

    if (!item) throw new Error("Product not found!");

    const productUpdated = await service.updateProduct(id, {
      title,
      description,
      price,
      stock,
    });

    res.json({
      msg: "Product updated",
      data: productUpdated,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteController = async (req, res, next) => {
  try {
    const { id } = req.params;

    await service.deleteProduct(id);

    res.json({
      msg: "Product deleted",
    });
  } catch (error) {
    next(error);
  }
};
