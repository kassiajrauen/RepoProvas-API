import { Request, Response } from "express";
import * as categoryService from "../services/categoryService.js";

export async function findMany(req: Request, res: Response){
    const categories = await categoryService.findMany();
    res.send({categories});
}