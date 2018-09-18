import { Injectable } from '@angular/core';
import { Dpt } from './dpt';
import { DEPARTMENTS } from './dptList';
import { Employee } from '../employees/employee';
import { EmployeeService } from '../employees/employee.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  getDepartments(): Observable<Dpt[]> {
    return of(DEPARTMENTS);
  }

  /*
  getDepartments(): Dpt[] {
    return DEPARTMENTS;
  }
  */
}
