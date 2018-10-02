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

    getAll(): Observable<Employee[]> {
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
        // TODO uncomment this to use localstorage
        //this.persist();

        return new_emp;
    }

    delete(id: number) {
        this.employees = this.employees.filter(
            (emp) => {
                return emp.id !== id;
            }
        );
        // TODO uncomment this to use localstorage
        //this.persist();
    }

    start_editing(employee, field){
        switch (field) {
            case 'first_name':
                employee.edit.first_name = !employee.edit.first_name;
                // if we just closed the edit field, we have to save the new value
                // TODO uncomment this to use localstorage
                //if (!employee.edit.first_name)
                //    this.persist();
                break;
            case 'last_name':
                employee.edit.last_name = !employee.edit.last_name;
                //if (!employee.edit.last_name)
                //    this.persist();
                break;
            case 'extra':
                employee.edit.extra = !employee.edit.extra;
                //if (!employee.edit.extra)
                //    this.persist();
                break;
        }
    }

    addDeptToEmp(departments) {
        this.employees.map(emp => {
            emp.dpt = this.getDepartmentById(emp.department_id, departments);
        })
        console.log("ICIIII");
    }

    getDepartmentById(dpt_id, dpt_array): Dpt {
        const dep = dpt_array.filter(dpt => {
            return dpt.id === dpt_id;
        });
        return dep[0];
    }
}
