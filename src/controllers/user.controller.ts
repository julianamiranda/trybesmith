import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createToken from '../services/jwt.create.services';
import UserService from '../services/user.services';

class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const data = req.body;
    await this.userService.create(data);
    const token = createToken(data.username);

    res.status(StatusCodes.CREATED).json({ token });
  };
}

export default UserController;