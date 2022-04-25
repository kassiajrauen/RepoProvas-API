import { Request, Response } from "express";
import * as userService from "../services/userService.js";

export async function signUp(req: Request, res: Response){
    const user = req.body;

    await userService.singUp(user);

    res.sendStatus(201);
}

export async function login(req: Request, res: Response){
    const user = req.body;
    const token = await userService.login(user);

    res.status(200).send(token);
}

export async function logout(req: Request, res: Response){
    const {authorization} = req.headers as {authorization : string};

    const token = authorization?.replace("Bearer", "")

    await userService.logout(token);

    res.sendStatus(200);
}
