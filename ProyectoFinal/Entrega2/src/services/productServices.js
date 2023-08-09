//Utilización MongoDB como DB
import ProductDaoMongoDB from '../daos/mongodb/productDao.js';
const ProductDao = new ProductDaoMongoDB();

import fs from 'fs';
import {__dirname} from '../utils.js'

//Utilización de FileSystem como DB
//import { __dirname } from "../utils.js";
//import ProductDaoFS from "../daos/filesystem/productDao.js";
//const ProductDao = new ProductDaoFS(__dirname + '/daos/filesystem/products.json');


export const addProductToCart = async(cartId, productId) => {
  try {
    const exists = await ProductDao.getProductById(productId);
    const newProductCart = await ProductDao.addProductToCart(productId, cartId);
    if(!exists) throw new Error('Product not found');
    else return newProductCart;
  } catch (error) {
      console.log(error);
  } 
}

export const createFileProducts = async () => {
    try {
      const productsFile = JSON.parse(fs.readFileSync(__dirname+'/data/products.json', 'utf-8'));
      const newProducts = await ProductDao.createProduct(productsFile);
      if(!newProducts) return false;
      else return { message: '¡Products saved success!' }
    } catch (error) {
      console.log(error);
    }
  }
  
  export const getByTitleProduct = async (title) => {
    try {
      const item = await ProductDao.getProductByTitle(title);
      if (!item) return false;
      else return item;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getByIdProduct = async (id) => {
    try {
      const item = await ProductDao.getProductById(id);
      if (!item) return false;
      else return item;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getByCodeProduct = async (code) => {
    try {
      const item = await ProductDao.getProductByCode(code);
      if (!item) return false;
      else return item;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getAllProducts = async () => {
    try {
      const item = await ProductDao.getAllProducts();
      if (!item) throw new Error("Product not found!");
      else return item;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const createProduct = async (obj) => {
    try {
      const newProduct = await ProductDao.createProduct(obj);
      if (!newProduct) throw new Error("Validation Error!");
      else return newProduct;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateProduct = async (id, obj) => {
    try {
      let item = await ProductDao.getProductById(id);
      if (!item) {
        throw new Error("Product not found!");
      } else {
        const productUpdated = await ProductDao.updateProduct(id, obj);
        return productUpdated;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteProduct = async (id) => {
    try {
      const productDeleted = await ProductDao.deleteProduct(id);
      return productDeleted;
    } catch (error) {
      console.log(error);
    }
  };
  