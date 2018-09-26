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

    addDeptToEmp(emp : Employee, dpt_id : number) {
        DEPARTMENTS.map(dpt => {
            if (dpt.id == dpt_id) {
                dpt.emps.push(emp);
                dpt.empNames.push(`${emp.first_name} ${emp.last_name}`);
            }
        });
    }

    addEmpToDept(departments, employees) : void {
      DEPARTMENTS.map(department=> {department.empNames = []})
     employees.map(employee => {
        DEPARTMENTS.map(department=> {
          if (employee.dpt_id == department.id && !department.empNames.includes(employee.first_name + " " + employee.last_name))
            department.empNames.push(employee.first_name + " " + employee.last_name);
            department.emps.push(employee);
        })
      })
    }

  /*
  getDepartments(): Dpt[] {
    return DEPARTMENTS;
  }
  */
}
