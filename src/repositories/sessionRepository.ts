import { prisma }  from "../database.js";

export interface Token {
    userId: number;
    token: string
}

export async function create(tokenData: Token){
    await prisma.sessions.create({
        data: tokenData
    })
}

export async function findByUserId(userId: number){
    return await prisma.sessions.findFirst({
        where: { userId}
    })
}

export async function findByToken(token: string){
    return await prisma.sessions.findFirst({
        where: { token}
    })
}

export async function remove(id: number){
    return await prisma.sessions.delete({
        where: { id }
    })
}