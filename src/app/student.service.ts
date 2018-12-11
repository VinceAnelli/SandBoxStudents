import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable, of, observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  readonly studentsUrl = 'api/students';
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error( error);
      return of(result as T);
    };
  }
  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl).pipe(catchError(this.handleError('fetched Students', [])));
  }

  getStudent(id: number): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(catchError(this.handleError<Student>(`fetched student id=${id}`)));
  }

  createStudents(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student).pipe(catchError(this.handleError<Student>('add Student')));
  }

  updateStudent(student: Student): Observable<any> {
    return this.http.put(this.studentsUrl, student).pipe(catchError(this.handleError<any>('update Student')));
  }

  deleteStudent(student: Student | number): Observable<any> {
    const id = typeof student === 'number' ? student : student.id;
    const url = `${this.studentsUrl}/${id}`;
    return this.http.delete<Student>(url).pipe(catchError(this.handleError<Student>('deleted Student')));
  }
}
