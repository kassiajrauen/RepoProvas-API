import * as testRepository from '../repositories/testRepository.js';

interface Filter {
    groupBy: "disciplines" | "teachers";
}

export async function find(filter: Filter){
    if(filter.groupBy === "disciplines") {
        return testRepository.getTestsByDiscipline();
    } else if(filter.groupBy === "teachers") {
        return testRepository.getTestsByTeachers();
    }
}