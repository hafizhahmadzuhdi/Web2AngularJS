import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DepartmentsComponent } from './departments/departments.component';
import { TasksComponent } from './tasks/tasks.component';
import { EmployeesComponent } from './employees/employees.component';
import { FormsModule } from '@angular/forms';
import { TaskdirectiveDirective } from './tasks/taskdirective.directive';


@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    TasksComponent,
    EmployeesComponent,
    TaskdirectiveDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
