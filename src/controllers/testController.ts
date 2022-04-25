import {Request, Response} from 'express';
import * as testService from '../services/testService.js';

export async function getTestByDiscipline(req: Request, res: Response){
    const testByDisciplines = await testService.getTestByDisciplines();

    res.send(testByDisciplines);
}

export async function getTestByTeacher(req: Request, res: Response){
   const testByTeacher = await testService.getTestByTeachers();

   res.send(testByTeacher);
}