import * as categoryRepository from "../repositories/categoryRepository.js";

export async function findMany(){
    return categoryRepository.findMany();
}