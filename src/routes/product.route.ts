import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const products = Router();

const productController = new ProductController();
products.post('/', productController.create);

export default products;