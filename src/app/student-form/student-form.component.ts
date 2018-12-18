import {Component, OnInit} from '@angular/core';
import {StudentService} from '../student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Student} from '../student';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar} from '@angular/material';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.less']
})
export class StudentFormComponent implements OnInit {
  student: Student;
  studentForm: FormGroup;
  public loading = false;

  constructor(private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<StudentFormComponent>,
              private snackBar: MatSnackBar) {
     this.studentForm = this.createFormGroupWithBuilder();
    }
  ngOnInit() {}



  close() {
    this.dialogRef.close();
    return this.dialogRef.afterClosed();
  }

  onSubmit(): void {
    this.loading = true;
    const result: Student = Object.assign({}, this.studentForm.value);
    console.log(result);
    this.studentService.createStudents(result).subscribe(null, null, () => this.loading = false);
    this.close();
    this.snackBar.open('Étudiant Ajouté', 'X', {duration: 3000});
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
