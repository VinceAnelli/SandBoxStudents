import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Student} from '../student';
import {StudentService} from '../student.service';
import {StudentsComponent} from './students.component';
import {By} from '@angular/platform-browser';
import {AppModule} from '../app.module';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable, of} from 'rxjs';


export class FakeMockUserService extends StudentService {

  students: Student[] = [];

  getStudents(): Observable<Student[]> {
    return of(this.students);
  }
}

fdescribe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let students;

  // methode 2
  let service: FakeMockUserService;

  // methode 3
  const fakeService: FakeMockUserService = new FakeMockUserService(null);

  beforeEach(async(() => {
    students = [
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
      }];
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule, AppModule],
        providers: [
     //     { provide: StudentsComponent, useClass: StudentService },
// Methode 1
     //    { provide: StudentService, useValue: { getStudents: () => of(students)} },
     // Methode 2
       //   { provide: StudentService, useClass: FakeMockUserService },
          // Methode 3
          { provide: StudentService, useValue: fakeService },
          { provide: APP_BASE_HREF, useValue : '/' }
        ],
        declarations: []
      });
      fixture = TestBed.createComponent(StudentsComponent);
      component = fixture.componentInstance;
      service = <FakeMockUserService>fixture.debugElement.injector.get(StudentService);

  /*  injector = getTestBed();
    service = injector.get(StudentService);
    httpMock = injector.get(HttpTestingController);
    comp = TestBed.get(StudentsComponent);
    service = TestBed.get(StudentService); */
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should display 3 students by default', () => {
    // Methode 2
    // service.students = students;

    fakeService.students = students;
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  });
});
