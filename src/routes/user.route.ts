import { Router } from 'express';
import UserController from '../controllers/user.controller';

const users = Router();

const userController = new UserController();

users.post('/', userController.create);

export default users;