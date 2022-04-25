import * as testRepository from '../repositories/testRepository.js';

const key = process.env.JWT_SECRET;

export async function getTestByDisciplines(){
   const terms = await testRepository.getDisciplinesByTerms();

   const tests = [];

   for(const term of terms){
        let t  = []
        for (const discipline of term.disciplines){
            t.push({ 
                disciplineId: discipline.id,
                disciplineName: discipline.name,
                tests: await testRepository.getTestByDiscipline(discipline.id)
            })
        }
        const result = {
            termId: term.id,
            termName: term.number,
            disciplines: tests
        }

        tests.push(result);
   }

   return tests;
}


export async function getTestByTeachers(){
    const teachers = await testRepository.getTeachers();
 
    const tests = [];
 
    for(const teacher of teachers){
        const testsByTeacher = await testRepository.getTeacherTest(teacher.id)

        const result = {
             teacherId: teacher.id,
             teacherName: teacher.name,
             categories: testsByTeacher
         }
 
         tests.push(result);
    }
 
    return tests;
 }