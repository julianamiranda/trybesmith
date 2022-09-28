import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import createToken from '../services/jwt.create.services';
import UserService from '../services/user.services';

class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const data = req.body;
    const result = await this.userService.create(data);
    const token = createToken(result);

    return res.status(StatusCodes.CREATED).json({ token });
  };

  public login = async (req: Request, res: Response) => {
    const data = req.body;
    const result = await this.userService.login(data);
    if (!result) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Username or password invalid' });
    }
    const token = createToken(result);
    return res.status(StatusCodes.OK).json({ token });
  };
}

export default UserController;