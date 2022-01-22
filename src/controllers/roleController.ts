import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

class Role {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    const roleExits = await prismaClient.role.findFirst({ where: { name: name } })

    if (roleExits) {
      return res.sendStatus(409)
    }

    const role = await prismaClient.role.create({
      data: {
        name, description
      }
    })
    return res.json(role);
  }

  async read(req: Request, res: Response) {

    const roles = await prismaClient.role.findMany()

    return res.json(roles);

  }

  async delete(req: Request, res: Response) {

    const { name } = req.body;

    const roleExits = await prismaClient.role.findFirst({ where: { name: name } })

    if (roleExits) {
      return res.sendStatus(404)
    }

    await prismaClient.role.delete({ where: { name: name } })

    return res.send("Deletado com sucesso");
  }


}
export default new Role();