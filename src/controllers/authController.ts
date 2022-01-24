import { Request, Response } from 'express'
import { prismaClient } from '../database/prismaClient';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

class Auth{

    async authenticate(req:Request, res: Response){

        const { email, pwd } = req.body

        const user =  await prismaClient.user.findFirst({ where: {email: email}  })

        if(!user){
            return res.sendStatus(401)
        }
        
        const isValid = await bcryptjs.compare(pwd, user.password)

        if(!isValid){
            return res.sendStatus(401)
        }

        const token = jwt.sign({id: user.id}, process.env.AUTH_SECRET, {expiresIn: '1d' })

        delete user.password

        res.json({
            user,
            token
        })



    }

}

export default new Auth()
