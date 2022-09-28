import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

const orderSchema = Joi.object({
  productsIds: Joi.array().items(Joi.number()).min(1).required()
    .messages({ 'array.min': '"productsIds" must include only numbers' }),
});

function validateOrder(req: Request, res: Response, next: NextFunction) {
  const verify = orderSchema.validate(req.body);
  if (verify.error) {
    const { message, details } = verify.error;
    if (details[0].type === 'any.required') {
      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    }
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message });
  }

  next();
}

export default validateOrder;

// validação do array de numeros: https://joi.dev/api/?v=17.6.1#arrayitemstypes