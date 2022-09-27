import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/product.services';

class ProductController {
  constructor(private productService = new ProductService()) { }
  
  public getAll = async (_req: Request, res: Response) => {
    const result = await this.productService.getAll();
    res.status(StatusCodes.OK).json(result);
  };

  public create = async (req: Request, res: Response) => {
    const data = req.body;
    const result = await this.productService.create(data);
    res.status(StatusCodes.CREATED).json(result);
  };
}

export default ProductController;