import Order from '../interface/order.interface';
import connection from '../models/connection';
import OrderModel from '../models/order.model';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.model.getAll();
    return result;
  }

  public create(order: Order) {
    return this.model.create(order);
  }
}

export default OrderService;