import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validateLogin from '../middleware/login.middleware';

const login = Router();

const userController = new UserController();

login.post('/', validateLogin, userController.login);

export default login;