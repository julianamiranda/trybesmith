import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const products = Router();

const productController = new ProductController();

products.get('/', productController.getAll);
products.post('/', productController.create);

export default products;