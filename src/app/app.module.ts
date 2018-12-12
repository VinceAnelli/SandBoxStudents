import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {StudentsComponent} from './students/students.component';
import {AppRoutingModule} from './app-routing.module';
import {StudentsDetailComponent} from './students-detail/students-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentFormComponent} from './student-form/student-form.component';
import {RouterOutlet} from '@angular/router';
import {AppMaterialModule} from './app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import 'hammerjs';
import {GfiInputComponent} from './gfi-input/gfi-input.component';
import {NgxLoadingModule} from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentsDetailComponent,
    StudentFormComponent,
    GfiInputComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AppRoutingModule,
    FormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ RouterOutlet,
  ],
})
export class AppModule { }
