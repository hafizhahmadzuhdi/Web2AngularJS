import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { DatabaseService } from '../database.service'
// import { EMPLOYEES } from './employees'
import { Dpt } from '../departments/dpt'
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    employees: Employee[];

    constructor(private db: DatabaseService, private http: HttpClient) {
        this.getAll().subscribe(emps =>
            this.employees = emps
        );
    }

    persist(){
        this.db.save("employees", this.employees);
    }

    getAll(): Observable<Employee[]> {
        this.employees = this.db.getEmployees();
        return this.employees ? of(this.employees) : this.http.get<Employee[]>('http://i875395.hera.fhict.nl/api/420882/employee');
    }

    add(first_name: string, last_name: string, extra: string, dpt_id: number) : Employee {
        // get the higher id from employees array
        let max_id = Math.max.apply(Math, this.employees.map(emp => emp.id));

        // if we do not have any employees_id we have to fix max_id at -1 in order to get 0
        if (max_id === Number.NEGATIVE_INFINITY)
            max_id = -1;

        const new_emp = {
            id: max_id + 1,
            first_name: first_name,
            last_name: last_name,
            birth_date: extra,
            department_id: dpt_id,
            dpt: null
        }

        // add new employee to array
        this.employees.push(new_emp);
        this.persist();

        return new_emp;
    }

    delete(id: number) {
        this.employees = this.employees.filter(
            (emp) => {
                return emp.id !== id;
            }
        );
        this.persist();
    }

    update(id ,f_n, l_n, bd, dpt_id){
        this.employees.map(
            (emp) => {
                if (emp.id === id) {
                    emp.first_name = f_n;
                    emp.last_name = l_n;
                    emp.birth_date = bd;
                    emp.department_id = dpt_id;
                }
            }
        );
        this.persist();
    }

    getEmployeesName(emp_ids){
        const emp_names = [];
        emp_ids.map(
            id => {
                this.employees.map(
                    emp => {
                        if (emp.id === id)
                            emp_names.push(`${emp.first_name} ${emp.last_name}`);
                    }
                )
            }
        )
        return emp_names;
    }

    getEmployees(emp_ids){
        const emps = [];
        emp_ids.map(
            id => {
                this.employees.map(
                    emp => {
                        if (emp.id === id)
                            emps.push(emp);
                    }
                )
            }
        )
        return emps;
    }

    getEmployeeById(emp_id) {
          const emps = this.employees.filter(emp => {
              return emp.id === emp_id;
          });
          return emps[0];
      }
}
