import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interface/order.interface';

class OrderModel {
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

  public async create({ userId, productsIds }: Order) {
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;

    await Promise.all(
      productsIds.map(async (productId: number) => {
        const data = await this.connection.execute(
          ' UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?;',
          [insertId, productId],
        );
        return data;
      }),
    );
    return { userId, productsIds };
  }
}

export default OrderModel;

// JSON_ARRAYAGG: Peguei a dica dessa thread(https://trybecourse.slack.com/archives/C02TH6V3MC5/p1663109003125079?thread_ts=1663108652.307629&cid=C02TH6V3MC5)