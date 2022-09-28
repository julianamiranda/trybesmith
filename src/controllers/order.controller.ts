import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import OrderService from '../services/order.services';

class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.orderService.getAll();
    res.status(StatusCodes.OK).json(result);
  };

  public create = async (req: Request, res: Response) => {
    type Token = { authorization: string };
    const { authorization } = req.headers as Token;
    type InfoToken = { id: number };
    const { productsIds } = req.body;

    const info = jwt.decode(authorization) as InfoToken;

    const result = await this.orderService.create({ userId: info.id, productsIds });
    console.log(result);
    return res.status(StatusCodes.CREATED).json({ userId: info.id, productsIds });
  };
}

export default OrderController;