import {Request, Response} from 'express';
import * as testService from '../services/testService.js';

export async function getTests(req: Request, res: Response){
    const {groupBy} = req.query as {groupBy: string};

    if (groupBy !== "disciplines" && groupBy !== "teachers") {
        return res.sendStatus(400);
    }

    const tests = await testService.find({groupBy});
    res.send({tests});
}

export async function views(req: Request, res: Response){
    const {id} = req.params;

    const views = await testService.views(Number(id));
    res.status(200).send(views);
}