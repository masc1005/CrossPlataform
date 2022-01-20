import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

class User {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body

    const user = await prismaClient.user.create({
      data: {
        name, email, password
      }
    })
    return res.json(user);
  }


}

export default new User();