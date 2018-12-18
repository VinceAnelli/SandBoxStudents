import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig, MatSnackBar, MatTable, MatTableDataSource} from '@angular/material';
import {Student} from './student';
import {Observable} from 'rxjs';
import {Location} from '@angular/common';
import {StudentFormComponent} from './student-form/student-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'SandBox';


  constructor(private dialog: MatDialog,
              private location: Location,
              ) {}
  openDialog(student: Student): Observable<void> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(StudentFormComponent, dialogConfig);
    return this.dialog._afterAllClosed;

  }

  dialogOpen(student: Student) {
    this.openDialog(student).subscribe(result => {
      // console.log('redirection vers ""');
      // this.location.go('');
    });
  }
}
