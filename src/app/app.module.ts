import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DepartmentsComponent } from './departments/departments.component';
import { TasksComponent } from './tasks/tasks.component';
import { EmployeesComponent } from './employees/employees.component';
import { FormsModule } from '@angular/forms';
import { TaskdirectiveDirective } from './tasks/taskdirective.directive';
import { DashboardComponent } from './dashboard/dashboard.component';

import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterPipe} from './filter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterTaskPipe } from './tasks/filtertask.pipe';

const appRoutes: Routes = [
  {
      path: 'departments',
      component: DepartmentsComponent
  },
  {
      path: 'employees',
      component: EmployeesComponent
  },
  {
      path: 'tasks',
      component: TasksComponent
  },
  {
      path: '',
      component: DashboardComponent
   }
];

@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    TasksComponent,
    EmployeesComponent,
    TaskdirectiveDirective,
    DashboardComponent,
    NavbarComponent,
    FilterPipe,
    FilterTaskPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
