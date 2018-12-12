import {Component, OnInit, ViewChild} from '@angular/core';
import {HasId, Student} from '../student';
import {StudentService} from '../student.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTable, MatTableDataSource} from '@angular/material';
import {forkJoin, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  student: Student;
  constructor(private studentservice: StudentService) { }
  dataSource: MatTableDataSource<Student>;
  displayedColumns: string[] = ['Select', 'Id', 'firstname', 'lastname', 'edit'];
  selection = new SelectionModel<Student>(true, []);
  public loading = false;

  ngOnInit() {
    this.getStudents();
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
    this.studentservice.getStudents().subscribe(students => {this.dataSource = new MatTableDataSource<Student>(students);
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
