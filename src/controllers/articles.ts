import articles from '../data/articles';
import { Request, Response } from 'express';

const list = async (
  request: Request,
  response: Response
): Promise<Response> => {
  return response.status(200).json(articles);
};

export default  {
  list
};