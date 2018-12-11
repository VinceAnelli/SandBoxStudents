export class Student implements HasId {
    id?: number;
    firstname = '';
    lastname = '';
    age: number;
    sector = '';
}

export interface HasId {
    id?: number;
}
