import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HasId, Student} from '../student';
import {StudentService} from '../student.service';
import {SelectionModel} from '@angular/cdk/collections';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {StudentsDetailComponent} from '../students-detail/students-detail.component';
import {MatDialog, MatDialogConfig, MatTable, MatTableDataSource} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.less']
})
export class StudentsComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table: MatTable<any>;
  student: Student;
  faEdit = faEdit;
  faTrash = faTrash;
  private studentCreatedSub: Subscription;

  constructor(private studentservice: StudentService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  dataSource: MatTableDataSource<Student>;
  displayedColumns: string[] = ['Select', 'Id', 'firstname', 'lastname', 'edit'];
  selection = new SelectionModel<Student>(true, []);
  public loading = false;

  ngOnInit() {
    this.getStudents();
    this.studentCreatedSub = this.studentservice.studentCreated.subscribe(() => this.getStudents());
  }

  ngOnDestroy(): void {
    if (this.studentCreatedSub) {
      this.studentCreatedSub.unsubscribe();
    }
  }

  openDialog(student: Student): Observable<void> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      student: student
    };
    return this.dialog.open(StudentsDetailComponent, dialogConfig).afterClosed();
  }

  dialogOpen(student: Student) {
    this.openDialog(student).subscribe(() => {
      this.getStudents();
      this.selection.clear();
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  getStudents(): void {
    this.loading = true;
    this.studentservice.getStudents().subscribe(students => {
      this.dataSource = new MatTableDataSource<Student>(students);
      this.loading = false;
    });
  }

  private deleteItem(data: HasId[], itemToDelete: HasId) {

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.id && itemToDelete.id && item.id === itemToDelete.id) {
        data.splice(i, 1);
        break;
      }
    }
    this.snackBar.open('Étudiant supprimé', 'X', {duration: 3000});
  }

  deleteStudents() {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce(s) étudiant(s)?')) {
      const obsTable: Observable<any>[] = [];
      this.selection.selected.forEach(item => {
        this.deleteItem(this.dataSource.data, item);
        obsTable.push(this.studentservice.deleteStudent(item).pipe(
          tap(() => console.log('étudiant supprimé : ' + item.id))
        ));
        // this.studentservice.deleteStudent(item).subscribe(() =>  console.log('student supprimé : ' + item.id));
        // this.dataSource = new MatTableDataSource<Student>(this.dataSource.data);
      });
      forkJoin(obsTable).subscribe(() => console.log('tous les étudiants sont supprimés'));
    }
    // this.studentservice.deleteStudent(item).subscribe(() =>  console.log('student supprimé'));
    this.selection = new SelectionModel<Student>(true, []);
    console.log('rendu du tableau');
    this.table.renderRows();
  }

}
