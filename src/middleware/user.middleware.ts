import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().required().min(3),
  classe: Joi.string().required().min(3),
  level: Joi.number().required().min(1),
  password: Joi.string().required().min(8),
});

function validateUser(req: Request, res: Response, next: NextFunction) {
  const verify = userSchema.validate(req.body);
  if (verify.error) {
    const { message, details } = verify.error;
    if (details[0].type === 'any.required') {
      return res.status(StatusCodes.BAD_REQUEST).json({ message });
    }
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message });
  }

  next();
}

export default validateUser;