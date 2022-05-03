import { prisma } from "../../src/database";
import bcrypt from 'bcrypt';

export default async function userFactory(user){
    await prisma.user.create({ 
        data: {
            ...user, 
            password: bcrypt.hashSync(user.password, 10)
        } 
    });
}