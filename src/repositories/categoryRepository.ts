import { prisma }  from "../database.js";

export async function findMany(){
    return prisma.category.findMany();
}