import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;
  if (!username) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"username" is required' });
  }

  if (!password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"password" is required' });
  }
  next();
}

export default validateLogin;