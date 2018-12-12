import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ],
  declarations: [],
  exports: [
    MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ]
})
export class AppMaterialModule { }
