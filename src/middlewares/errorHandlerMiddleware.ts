import {Request, Response, NextFunction} from 'express';

export default function errorHandlerMiddleware (error, req: Request, res: Response, next: NextFunction) {
    console.log(error);

    if(error.type === 'unauthorized'){
        return res.sendStatus(401);
    } else if(error.type === 'conflict'){
        return res.sendStatus(409);
    } else if(error.type === 'not_found'){
        return res.sendStatus(404);
    } else if(error.type === 'bad_request'){
        return res.sendStatus(400);
    }

    return res.sendStatus(500);
}