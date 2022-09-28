import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interface/user.interface';

class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }

  public async login(login: User): Promise<User> {
    const { username, password } = login;
    const result = await this.connection.execute(
      `SELECT id, username FROM Trybesmith.Users 
      WHERE username = ? AND password = ?`,
      [username, password],
    );
    const [rows] = result;
    const [user] = rows as User[];
    return user;
  }
}

export default UserModel;