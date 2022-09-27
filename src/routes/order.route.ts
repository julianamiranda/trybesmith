import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const order = Router();

const orderController = new OrderController();

order.get('/', orderController.getAll);

export default order;