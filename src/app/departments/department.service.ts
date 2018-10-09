import { Injectable } from '@angular/core';
import { Dpt } from './dpt';
import { Employee } from '../employees/employee';
import { EmployeeService } from '../employees/employee.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatabaseService } from '../database.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

    departments: Dpt[];

  constructor(private http: HttpClient, private db: DatabaseService) {
      this.getDepartments().subscribe(dpts => {
          this.departments = dpts;
          this.db.save('dpts', this.departments);
      });
  }

  getDepartments(): Observable<Dpt[]> {
      this.departments = this.db.getDepartments();
     return this.departments ? of(this.departments) : this.http.get<Dpt[]>(this.departmentsUrl);
   }

  private departmentsUrl = 'http://i875395.hera.fhict.nl/api/420882/department';

    addDeptToEmp(emp : Employee, dpt_id : number) {
        this.departments.map(dpt => {
            if (dpt.id == dpt_id) {
                if (!dpt.empNames)
                    dpt.empNames = [];
                dpt.empNames.push(`${emp.first_name} ${emp.last_name}`);
                dpt.employees.push(emp.id);
            }
        });
    }

    addEmpToDept(departments, employees) : void {
        this.departments.map(department=> {department.employees = []});
        employees.map(employee => {
            this.departments.map(department=> {
                if (employee.dpt_id == department.id && !department.empNames.includes(employee.first_name + " " + employee.last_name))
                department.empNames.push(employee.first_name + " " + employee.last_name);
                department.employees.push(employee.dpt_id);
            })
    });
    }

    getDepartmentById(dpt_id) {
        const dep = this.departments.filter(dpt => {
            return dpt.id === dpt_id;
        });
        return dep[0];
    }

}
