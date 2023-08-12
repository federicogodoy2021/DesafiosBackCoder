import * as service from "../services/productServices.js";

//Controller para dar de alta una lista de productos
export const createFileController = async (req, res, next) => {
  try {
    const newProducts = await service.createFileProducts();
    if (!newProducts) throw new Error("Validation Error!");
    else res.json(newProducts);
  } catch (error) {
    next(error);
  }
};
//Controller para añadir un producto al carrito
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
//Controller para traer un producto por su titulo  
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
//Controller para traer un producto por su ID  
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
//Controller para traer un producto por su codigo  
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
//Controller para traer todos los productos con paginación y limite de productos por pagina  
export const getAllController = async (req, res, next) => {
  try {
    const { page, limit } = req.query
    const response = await service.getAllProducts(page, limit);
    const next = response.hasNextPage ? `http://localhost:8080/products/all?page=${response.nextPage}` : null;
    const prev = response.hasPrevPage ? `http://localhost:8080/products/all?page=${response.prevPage}` : null;
    const status = (response) ? "success" : "error";
    res.json(
      {
      info:{
        status: status,
        count: response.totalDocs,
        pages: response.totalPages,
        next,
        prev,
        results: response.docs
      }
    });
  } catch (error) {
    next(error);
  }
};
//Controller para crear un nuevo producto  
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
//Controller para actualizar un producto por su ID
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
//Controller para elimiar un producto por su ID  
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
//Aggregations con filtro, agrupamiento y ordenamiento
export const aggregation1 = async (req, res, next) => {
  try {
    //const { code } = req.query
    const response = await service.aggregation1( /*code*/ )
    res.json(response)
  } catch (error) {
    next(error.message);
  }
}

