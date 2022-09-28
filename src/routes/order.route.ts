import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import validateOrder from '../middleware/order.middleware';
import validateToken from '../middleware/token.middleware';

const order = Router();

const orderController = new OrderController();

order.get('/', orderController.getAll);
order.post('/', validateToken, validateOrder, orderController.create);

export default order;