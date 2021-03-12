import Users from '../models/Users';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt'

/**
 * Return post by id
 */
interface IndexRequestInterface extends Request {
  body: {
    session: {
      id: string;
    }
  },
}

const index = async (
  request: IndexRequestInterface,
  response: Response
): Promise<Response> => {
  try {
    const { session } = request.body

    const user = await Users.findById(session.id)

    return response.status(200).json(user);
  } catch (error) {
  
    return response.status(500).json(error);
  }
};

/**
 * List all users not id logged
 */
interface ListRequestInterface extends Request {
  body: {
    session: {
      id: string;
    }
  },
}

const list = async (
  request: ListRequestInterface,
  response: Response
): Promise<Response> => {
  try {
    const { session } = request.body;

    const users = await Users.find({ _id: { $ne: session.id } })
    
    return response.status(200).json(users);
  } catch (error) {
    return response.status(500).json(error);
  }
};

/**
 * Store a new post
 */
interface StoreRequestInterface extends Request {
  body: {
    name: string,
    user: string,
    password: string,
  },
}

const store = async (
  request: StoreRequestInterface,
  response: Response
): Promise<Response> => {
  try {
    const { name, user, password } = request.body

    const hash = await bcrypt.hash(password, 8)

    const newUser = await Users.create({
      name,
      user,
      password: hash,      
    })

    delete newUser.password
    
    return response.status(201).json(newUser);
  } catch (error) {
    return response.status(500).json(error);
  }
};

/**
 * Update user by id
 */
 interface UpdateRequestInterface extends Request {
  params: {
    id: string;
  };
  body: {
    session: {
      id: string;
    },    
    name: string,    
  };
}

const update = async (
  request: UpdateRequestInterface,
  response: Response
): Promise<Response> => {
  try {
    const { session, name } = request.body

    const user = await Users.findByIdAndUpdate(session.id, {
      name,      
    }, { new: true })
    
    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json(error);
  }
};

/**
 * Delete user by id
 */
 interface DestroyRequestInterface extends Request {
  body: {
    session: {
      id: string;
    }
  },
}

const destroy = async (
  request: DestroyRequestInterface,
  response: Response
): Promise<Response> => {
  try {
    const { session } = request.body

    const result = await Users.findByIdAndDelete(session.id)

    if(!result)
      return response.status(404).send();;  

    return response.status(200).json({});
  } catch (error) {
  
    return response.status(500).json(error);
  }
};

export default  {
  index,
  list,
  store,
  update,
  destroy,
};