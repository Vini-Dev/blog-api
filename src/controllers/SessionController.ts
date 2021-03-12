import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Users from '../models/Users';
import { Request, Response } from 'express';

/**
 * Login
 */
 interface StoreRequestInterface extends Request {
  body: {
    user: string;
    password: string;
  },
}

const { JWT_SESSION_KEY, JWT_SESSION_LIFETIME } = process.env

const store = async (
  request: StoreRequestInterface,
  response: Response
): Promise<Response> => {
  
  const { user, password } = request.body

  try {
    const result = await Users.findOne({ user }).select('+password')

    if(result === null)
      return response.status(404).send();  

    const isEqual = await bcrypt.compare(password, result.password)

    if(!isEqual)
      return response.status(400).json({ message: 'Invalid credentials!' });  

    const token = 'Bearer ' + jwt.sign({ id: result._id }, JWT_SESSION_KEY, {
        expiresIn: JWT_SESSION_LIFETIME
      });
  
    return response.status(200).json({ token, user: result });
  } catch (error) {
  
    return response.status(500).json(error);
  }
};

export default {
  store,
};