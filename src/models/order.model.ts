import { Pool } from 'mysql2/promise';
import Order from '../interface/order.interface';

class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      `SELECT O.id, O.userId, JSON_ARRAYAGG(P.id) AS productsIds FROM Trybesmith.Orders as O 
      INNER JOIN Trybesmith.Products AS P ON O.id = P.orderId 
      GROUP BY O.id ORDER BY O.userId`,
    );
    const [rows] = result;
    return rows as Order[];
  }
}

export default ProductModel;

// JSON_ARRAYAGG: Peguei a dica dessa thread(https://trybecourse.slack.com/archives/C02TH6V3MC5/p1663109003125079?thread_ts=1663108652.307629&cid=C02TH6V3MC5)