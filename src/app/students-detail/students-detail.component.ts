import {Component, OnInit, Inject} from '@angular/core';
import {StudentService} from '../student.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Student} from '../student';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.less']
})
export class StudentsDetailComponent implements OnInit {
  student: Student;
  students: Student[];
  studentForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private location: Location,
    private dialogRef: MatDialogRef<StudentsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.studentForm = this.createFormGroupWithBuilder();
    this.student = data.student;
    this.studentForm.patchValue(data.student);
  }

  ngOnInit() {}
  close() {
    this.dialogRef.close();
    return this.dialogRef.afterClosed();
  }
/*
  getStudent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(this.student.id).subscribe(student => {
      this.student = student;
      this.studentForm.patchValue(student);
    });
  }
*/
  delete(student: Student): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ' + student.firstname + ' ' + student.lastname + '?')) {
      this.studentService.deleteStudent(student).subscribe(() => this.close());
    }
  }

  onSubmit(): void {
    const result: Student =  this.studentForm.value; // Object.assign({}, this.studentForm.value);
    result.id = this.student.id;
    this.studentService.updateStudent(result).subscribe();
    this.close();
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
