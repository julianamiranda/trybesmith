import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validateUser from '../middleware/user.middleware';

const users = Router();

const userController = new UserController();

users.post('/', validateUser, userController.create);

export default users;