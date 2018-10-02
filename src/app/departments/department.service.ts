import { Injectable } from '@angular/core';
import { Dpt } from './dpt';
import { DEPARTMENTS } from './dptList';
import { Employee } from '../employees/employee';
import { EmployeeService } from '../employees/employee.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  // getDepartments(): Observable<Dpt[]> {
  //   return of(DEPARTMENTS);
  // }

  getDepartments(): Observable<Dpt[]> {
     return this.http.get<Dpt[]>(this.departmentsUrl)
   }

  private departmentsUrl = 'http://i875395.hera.fhict.nl/api/416063/department';

    addDeptToEmp(emp : Employee, dpt_id : number) {
        DEPARTMENTS.map(dpt => {
            if (dpt.id == dpt_id) {
                // dpt.emps.push(emp);
                dpt.empNames.push(`${emp.first_name} ${emp.last_name}`);
                dpt.employees.push(emp.id)//
            }
        });
    }

    // addEmpToDept(departments, employees) : void {
    //   DEPARTMENTS.map(department=> {department.empNames = []})
    //  employees.map(employee => {
    //     DEPARTMENTS.map(department=> {
    //       if (employee.dpt_id == department.id && !department.empNames.includes(employee.first_name + " " + employee.last_name))
    //         department.empNames.push(employee.first_name + " " + employee.last_name);
    //         department.emps.push(employee);
    //     })
    //   })
    // }

    
    addEmpToDept(departments, employees) : void {
      DEPARTMENTS.map(department=> {department.employees = []})
     employees.map(employee => {
        DEPARTMENTS.map(department=> {
          if (employee.dpt_id == department.id && !department.empNames.includes(employee.first_name + " " + employee.last_name))
            department.empNames.push(employee.first_name + " " + employee.last_name);
            department.employees.push(employee.dpt_id);
      })
    })
  }

}
