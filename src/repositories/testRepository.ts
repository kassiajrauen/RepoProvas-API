import { prisma } from "../database.js";

export interface Test {
  id: number;
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherDisciplineId: number;
}

export type InsertTest = Omit<Test, "id">;

export async function getDisciplinesByTerms(){
    return await prisma.terms.findMany({ 
        select: { 
            id: true,
            number: true,
            disciplines: { 
                select: { 
                    id: true,
                    name: true,
                }
            }
        }
    })
}

export async function getTestByDiscipline(disciplineId: number) {
	return await prisma.categories.findMany({
		select: {
			id: true,
			name: true,
			tests: {
				where: {
                    teachersDisciplines: {
                        disciplineId: disciplineId
                    }
				},
				select: {
					id: true,
					name: true,
					pdfUrl: true,
					teachersDisciplines: {
						select: {
							teachers: {
								select: { name: true }
							}
						}
					}
				}
			}
		}
	})
}
export async function getTeachers(){
    return prisma.tests.findMany({
        select: {
            id: true,
            name: true,
        }
    })
}

export async function getTeacherTest(teacherId: number) {
    return await prisma.categories.findMany({
      select: {
        id: true,
        name: true,
        tests: {
          where: {
            teachersDisciplines: {
              teacherId: teacherId
            }
          },
          select: {
            id: true,
            name: true,
            pdfUrl: true,
            teachersDisciplines: {
              select: {
                disciplines: {
                  select: { name: true }
                }
              }
            }
          }
        }
      }
    })
  }


