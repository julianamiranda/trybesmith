import User from '../interface/user.interface';
import connection from '../models/connection';
import UserModel from '../models/user.model';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public create(product: User): Promise<User> {
    return this.model.create(product);
  }
}

export default UserService;