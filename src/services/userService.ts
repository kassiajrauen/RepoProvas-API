import * as userRepository from '../repositories/userRepository.js';
import * as sessionRepository from '../repositories/sessionRepository.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export async function singUp(user: userRepository.userInsert){
    const userExist = await userRepository.findByEmail( user.email );
    if(userExist) throw {type: 'conflict', message: 'This email is already registered'}

    const passwordHash = bcrypt.hashSync(user.password, 10);

    const {email, password} = user;

    await userRepository.create( {email, password: passwordHash} );
}

export async function login(user: userRepository.userInsert){
    const {email, password} = user;

    const userExist = await userRepository.findByEmail( email );
    const comparePassword = bcrypt.compare(password, userExist.password);
    if(!userExist || !comparePassword) throw {type: 'bad_request', message: 'Incorrect email or password'}

    const sessionExist = await sessionRepository.findByUserId(userExist.id );
    
    if(sessionExist){
        try {
            const key = process.env.JWT_SECRET;
            jwt.verify(sessionExist.token, key)
            return {token: sessionExist.token}
        } catch (error) {
            console.log(error);
            throw {type: 'unauthorized', message: 'Invalid session token'}
        }
    } 
    
    const key = process.env.JWT_SECRET;
    const token = jwt.sign(email, key);
    await sessionRepository.create({ token, userId: userExist.id });
    

    return token;
}

export async function logout(token: string){
    const {id} = await sessionRepository.findByToken(token) as {id: number};

    await sessionRepository.remove(id);
}