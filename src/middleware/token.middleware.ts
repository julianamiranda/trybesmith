import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  const secret = 'senha-super-secreta';
  if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  try {
    jwt.verify(token, secret);
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
  next();
}

export default validateToken;
// codigo refatorado do projeto Blogs API (original: https://github.com/tryber/sd-020-a-project-blogs-api/blob/7416e1e57ac43a2838941ae63e4b1b265555a845/src/middlewares/validateToken.js)