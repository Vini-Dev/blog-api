import Posts from '../models/Posts';
import { Request, Response } from 'express';

/**
 * Return post by id
 */
 interface IndexRequestInterface extends Request {
  params: {
    id: string;
  },
}
const index = async (
  request: IndexRequestInterface,
  response: Response
): Promise<Response> => {
  
  const { id } = request.params

  try {
    const post = await Posts.findById(id).populate('created_by')

    if(!post)
      return response.status(404).send();;  

    return response.status(200).json(post);
  } catch (error) {
  
    return response.status(500).json(error);
  }
};

/**
 * List all posts
 */
const list = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const posts = await Posts.find().sort({ created_at: -1 }).populate('created_by')
    
    return response.status(200).json(posts);
  } catch (error) {    
    return response.status(500).json(error);
  }
};

/**
 * Store a new post
 */
interface StoreRequestInterface extends Request {
  body: {
    session: {
      created_by: string;
      updated_by: string;
    };
    description: string,
    image: string,
  },
}

const store = async (
  request: StoreRequestInterface,
  response: Response
): Promise<Response> => {
  try {
    const { session, description, image  } = request.body
    const { created_by, updated_by } = session

    const post = await Posts.create({
      description,
      image,
      created_by,
      updated_by,
    })
    
    return response.status(201).json(post);
  } catch (error) {
    return response.status(500).json(error);
  }
};

/**
 * Update post by id
 */
 interface UpdateRequestInterface extends Request {
  params: {
    id: string;
  };
  body: {
    description: string,
    image: string,
  };
}

const update = async (
  request: UpdateRequestInterface,
  response: Response
): Promise<Response> => {
  try {
    const { id } = request.params
    const { description, image } = request.body

    const post = await Posts.findByIdAndUpdate( id, {
      description,
      image,      
    }, { new: true })
    
    return response.status(200).json(post);
  } catch (error) {
    return response.status(500).json(error);
  }
};

/**
 * Delete post by id
 */
interface DestroyRequestInterface extends Request {
  params: {
    id: string;
  },
}
const destroy = async (
  request: DestroyRequestInterface,
  response: Response
): Promise<Response> => {
  
  const { id } = request.params

  try {
    const result = await Posts.findByIdAndDelete(id)

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