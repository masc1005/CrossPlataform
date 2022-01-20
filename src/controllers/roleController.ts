import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

class Role {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    const role = await prismaClient.role.create({
      data: {
        name, description
      }
    })
    return res.json(role);
  }
}
export default new Role();