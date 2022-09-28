import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import validateProduct from '../middleware/product.middleware';

const products = Router();

const productController = new ProductController();

products.get('/', productController.getAll);
products.post('/', validateProduct, productController.create);

export default products;