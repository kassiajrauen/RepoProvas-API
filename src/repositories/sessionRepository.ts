import { prisma }  from "../database.js";

export interface Token {
    userId: number;
    token: string
}

export async function create(tokenData: Token){
    await prisma.session.create({
        data: tokenData
    })
}

export async function findByUserId(userId: number){
    return await prisma.session.findFirst({
        where: { userId}
    })
}

export async function findByToken(token: string){
    return await prisma.session.findFirst({
        where: { token}
    })
}

export async function remove(id: number){
    return await prisma.session.delete({
        where: { id }
    })
}