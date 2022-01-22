import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export default function authMiddleware(req: Request, res: Response, next: NextFunction){

    const { authorization } = req.headers

    if(!authorization){
        res.sendStatus(401)
    }

    const token = authorization.replace('Bearer', '').trim()

    try {
        
        const data = jwt.verify(token, process.env.AUTH_SECRET)

        console.log(data)

    } catch {
        res.sendStatus(401)
    }
        
    next()
}