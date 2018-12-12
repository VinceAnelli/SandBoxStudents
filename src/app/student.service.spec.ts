import {getTestBed, inject, TestBed} from '@angular/core/testing';
import {Student} from './student';
import {StudentService} from './student.service';
import {HttpClient} from '@angular/common/http';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('StudentService', () => {
  let injector: TestBed;
  let service: StudentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        StudentService,
      ]});
      injector = getTestBed();
      service = injector.get(StudentService);
      httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service2: StudentService = TestBed.get(StudentService);
    expect(service2).toBeTruthy();
  });
  it('can instantiate service with "new"', inject([HttpClient], (http: HttpClient) => {
    expect(http).not.toBeNull('http sould be provided');
  }));

  describe('#updateStudent', () => {
    it('should update student', () => {
      service.updateStudent({
        firstname: 'Jean2',
        lastname: 'Renard2',
        age: 19,
        sector: 'Web2'
      }).subscribe(student => {
        expect(student.id).toBe(6);
      });

    const req = httpMock.expectOne(`${service.studentsUrl}`);
    const actualPutStudent: Student = JSON.parse(String(req.request.serializeBody()));
    expect(actualPutStudent).toEqual({
      firstname: 'Jean2',
      lastname: 'Renard2',
      age: 19,
      sector: 'Web2'});
      expect(req.request.method).toBe('PUT');
    req.flush({
      id: 6,
      firstname: 'Jean2',
      lastname: 'Renard2',
      age: 19,
      sector: 'Web2'});
    });
  });


  describe('#getStudent', () => {
    it('should return the good Student', () => {

     service.getStudent(2).subscribe( student => {
         expect(student.firstname).toBe('Jean');
      });

      const req = httpMock.expectOne(`${service.studentsUrl}` + '/2');
      req.flush({
        id: 2,
        firstname: 'Jean',
        lastname: 'Renard',
        age: 18,
        sector: 'Web'
    });
      httpMock.verify();
    });
  });



  describe('#createStudent', () => {
    it('should create student', () => {
      service.createStudents({
        firstname: 'Jean',
        lastname: 'Renard',
        age: 18,
        sector: 'Web'}).subscribe(student => {
           expect(student.id).toBe(5);
        });


      const req = httpMock.expectOne(`${service.studentsUrl}`);
      const actualPostedStudent: Student = JSON.parse(String(req.request.serializeBody()));
      expect(actualPostedStudent).toEqual({
        firstname: 'Jean',
        lastname: 'Renard',
        age: 18,
        sector: 'Web'});
      expect(req.request.method).toBe('POST');
      req.flush({
        id: 5,
        firstname: 'Jean',
        lastname: 'Renard',
        age: 18,
        sector: 'Web'});
    });
  });


  describe('#getStudents', () => {
    it('should return an Observable<Student[]>', () => {
      const dummyStudents = [
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
      }
      ];

     service.getStudents().subscribe( students => {
        expect(students.length).toBe(2);
        expect(students).toEqual(dummyStudents);
      });

      const req = httpMock.expectOne(`${service.studentsUrl}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyStudents);
      httpMock.verify();
    });
  });

  describe('#deleteStudent', () => {
    it('should delete the student', () => {
      service.deleteStudent({
        id: 1,
        firstname: 'Miguel',
        lastname: 'Dupont',
        age: 20,
        sector: 'IT'
    }).subscribe( student => {
        expect(student.firstname).toBe('Miguel');
    });

    const req = httpMock.expectOne(`${service.studentsUrl}` + '/1');
    const actualDeletedStudent: Student = JSON.parse(String(req.request.serializeBody()));
    expect(actualDeletedStudent).toEqual(null);
    expect(req.request.method).toBe('DELETE');
    req.flush({
      id: 1,
      firstname: 'Miguel',
      lastname: 'Dupont',
      age: 20,
      sector: 'IT'
  });
    });
  });
});
