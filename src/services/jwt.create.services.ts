import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';

dotenv.config();

function createToken(data: string) {
  const secret = 'senha-super-secreta';

  const jwtConfig: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data }, secret, jwtConfig);
  return token;
}

export default createToken;

// codigo refatorado do projeto Blogs API (original: https://github.com/tryber/sd-020-a-project-blogs-api/blob/7416e1e57ac43a2838941ae63e4b1b265555a845/src/services/jwtService.js)