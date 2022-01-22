import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs'
import { prismaClient } from '../database/prismaClient';

class User {

  async create(req: Request, res: Response) {
    const { name, email, pwd } = req.body

    const userExists = await prismaClient.user.findFirst({ where: {email: email} })

    if(userExists){
      return res.sendStatus(409)
    }

    const password = await bcryptjs.hash(pwd, 10)    

    const user = await prismaClient.user.create({
      data: {
        name, email, password
      }
    })
    return res.json(user);
  }


  async read(req: Request, res: Response) {  

    const userID = req.userId

    const dataUser = await prismaClient.user.findFirst({where: { id: userID },
      include: {
        UserRole:{
          where: { user_id: userID },
          include: {
            role: true
          }
        }
      }
    })

    return res.json({ dataUser })

  }


}

export default new User();