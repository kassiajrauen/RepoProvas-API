import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as sessionRepository from '../repositories/sessionRepository.js';

dotenv.config();

export default async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if(!token) throw {type: 'unauthorized', message: 'Not authorized'};

    const sessionExist = await sessionRepository.findByToken(token);
    if(!sessionExist) throw {type: 'unauthorized', message: 'Token is not available'};

    try {
        const key = process.env.JWT_SECRET;
        jwt.verify(token, key);
        res.locals.user = {userId: sessionExist.userId}
    } catch (error) {
        console.log(error);
        throw { type: 'unauthorized', message: 'The token is invalid'};
    }

    next();
}
