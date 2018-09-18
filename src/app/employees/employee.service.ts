import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { DatabaseService } from '../database.service'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    employees: Employee[];

    constructor(private db: DatabaseService) {
    }

    // used to save the list in localStorage
    private persist(): void {
        this.db.save('employees', this.employees);
    }

    getAll() {
        this.employees = this.db.getEmployees();
        return this.employees;
    }

    add(first_name: string, last_name: string, extra: string) {
        // get the higher id from employees array
        let max_id = Math.max.apply(Math, this.employees.map(emp => emp.id));

        // if we do not have any employees_id we have to fix max_id at -1 in order to get 0
        if (max_id === Number.NEGATIVE_INFINITY)
            max_id = -1;
            
        // add new employee to array
        this.employees.push(
            {
                id: max_id + 1,
                first_name: first_name,
                last_name: last_name,
                extra: extra,
                edit: {
                    first_name: false,
                    last_name: false,
                    extra: false
                }
            }
        );
        this.persist();
    }

    delete(id: number) {
        this.employees = this.employees.filter(
            (emp) => {
                return emp.id !== id;
            }
        );
        this.persist();
    }

    start_editing(employee, field){
        switch (field) {
            case 'first_name':
                employee.edit.first_name = !employee.edit.first_name;
                // if we just closed the edit field, we have to save the new value
                if (!employee.edit.first_name)
                    this.persist();
                break;
            case 'last_name':
                employee.edit.last_name = !employee.edit.last_name;
                if (!employee.edit.last_name)
                    this.persist();
                break;
            case 'extra':
                employee.edit.extra = !employee.edit.extra;
                if (!employee.edit.extra)
                    this.persist();
                break;
        }
    }
}
