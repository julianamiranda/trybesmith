import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../interface/user.interface';

dotenv.config();

function createToken({ id, username }: User) {
  const secret = 'senha-super-secreta';

  const jwtConfig: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ id, username }, secret, jwtConfig);
  return token;
}

export default createToken;

// codigo refatorado do projeto Blogs API (original: https://github.com/tryber/sd-020-a-project-blogs-api/blob/7416e1e57ac43a2838941ae63e4b1b265555a845/src/services/jwtService.js)