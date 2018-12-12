import {Component, OnInit} from '@angular/core';
import {StudentService} from '../student.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Student} from '../student';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  student: Student;
  studentForm: FormGroup;
  public loading = false;


  constructor(private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location,
     private formBuilder: FormBuilder) {
     this.studentForm = this.createFormGroupWithBuilder();
    }

  ngOnInit() {}

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.loading = true;
    const result: Student = Object.assign({}, this.studentForm.value);
    this.studentService.createStudents(result).subscribe(_ => this.loading = false);
    this.goBack();
  }

  createFormGroup() {
    return new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      age: new FormControl(),
      sector: new FormControl()
    });
  }

  createFormGroupWithBuilder() {
    return this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      sector: ['', Validators.required],
    });
  }
}
