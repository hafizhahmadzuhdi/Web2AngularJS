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

    addEmpToDept(emp : Employee, dpt_id : number) {
        DEPARTMENTS.map(dpt => {
            if (dpt.id == dpt_id) {
                dpt.emps.push(emp);
                dpt.empNames.push(`${emp.first_name} ${emp.last_name}`);
            }
        });
    }

  /*
  getDepartments(): Dpt[] {
    return DEPARTMENTS;
  }
  */
}
