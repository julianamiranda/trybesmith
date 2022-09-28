import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().required().min(3),
  amount: Joi.string().required().min(3),
});

function validateProduct(req: Request, res: Response, next: NextFunction) {
  const verify = productSchema.validate(req.body);
  if (verify.error) {
    const { message, details } = verify.error;
    if (details[0].type === 'any.required') {
      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    }
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message });
  }

  next();
}

export default validateProduct;