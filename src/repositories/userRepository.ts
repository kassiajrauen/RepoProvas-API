import {prisma}  from "../database.js";

export interface User {
    id: number;
    email: string;
    password: string;
}

export type userInsert = Omit<User, "id">;

export async function create(user: userInsert){
   const {email, password} = user;

   return prisma.user.create({
    data: {
        email, password
    }
   })
}

export async function findByEmail(email: string){
    return await prisma.user.findUnique ({ 
    where: {
        email
    }
    })
}