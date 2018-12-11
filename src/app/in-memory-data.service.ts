import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from './student';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const students = [
            {
                id: 1,
                firstname: 'Miguel',
                lastname: 'Dupont',
                age: 20,
                sector: 'IT'
            },
            {
                id: 2,
                firstname: 'Jean',
                lastname: 'Renard',
                age: 18,
                sector: 'Web'
            },
            {
                id: 3,
                firstname: 'Arnaud',
                lastname: 'Dupond',
                age: 22,
                sector: 'Si'
            }
        ];

        return {students};
    }

    genId(students: Student[]): number {
        if (students.length > 0) {
            console.log('Students already setup');
             return Math.max(...students.map(hero => hero.id)) + 1;
         }

         console.log('No student were setup, using id=1');
         return 1;
    }
}
