import {Component, OnInit} from '@angular/core';
import {StudentService} from '../student.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Student} from '../student';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.css']
})
export class StudentsDetailComponent implements OnInit {
  student: Student;
  students: Student[];
  studentForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private location: Location ) {
      this.studentForm = this.createFormGroupWithBuilder();
     }

  ngOnInit() {
    this.getStudent();
  }

  getStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id).subscribe(student => {
      this.student = student;
      this.studentForm.patchValue(student);
    });
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe(students => this.students = students);
  }

  goBack(): void {
    this.location.back();
  }

  delete(student: Student): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ' + student.firstname + ' ' + student.lastname + '?')) {
      this.studentService.deleteStudent(student).subscribe(() => this.goBack());
    }
  }

  onSubmit(): void {
    const result: Student =  this.studentForm.value; // Object.assign({}, this.studentForm.value);
    result.id = this.student.id;
    this.studentService.updateStudent(result).subscribe();
    this.goBack();
  }

  createFormGroupWithBuilder() {
    return this.formBuilder.group({
      firstname: '',
      lastname: '',
      age: '',
      sector: ''
    });
  }
}
