import {NgModule} from '@angular/core';
import {StudentsComponent} from './students/students.component';
import {RouterModule, Routes} from '@angular/router';
import {StudentsDetailComponent} from './students-detail/students-detail.component';
import {StudentFormComponent} from './student-form/student-form.component';

const routes: Routes = [
  { path: 'studentForm', component: StudentFormComponent},
  { path: '' , component: StudentsComponent},
  { path: 'students/:id', component: StudentsDetailComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }

