import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    constructor() {
    }

    getAll() {
        return this.employees;
    }

    add(first_name: string, last_name: string, extra: string) {
        // get the higher id from employees array
        let max_id = Math.max.apply(Math, this.employees.map(emp => emp.id));
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
    }

    delete(id: number) {
        this.employees = this.employees.filter(
            (emp) => {
                return emp.id !== id;
            }
        );
    }

    start_editing(employee, field){
        switch (field) {
            case 'first_name':
                employee.edit.first_name = !employee.edit.first_name;
                break;
            case 'last_name':
                employee.edit.last_name = !employee.edit.last_name;
                break;
            case 'extra':
                employee.edit.extra = !employee.edit.extra;
                break;
        }
        console.log(this.employees);
    }

    employees = [
        {
            id: 0,
            first_name: 'John',
            last_name: 'Doe',
            extra: 'bla bla bla',
            edit: {
                first_name: false,
                last_name: false,
                extra: false
            }
        },
        {
            id: 1,
            first_name: 'Bob',
            last_name: 'Hee',
            extra: 'bli bli bli',
            edit: {
                first_name: false,
                last_name: false,
                extra: false
            }
        },
        {
            id: 3,
            first_name: 'Louis',
            last_name: 'Armstrong',
            extra: 'blo blo blo',
            edit: {
                first_name: false,
                last_name: false,
                extra: false
            }
        },
        {
            id: 4,
            first_name: 'Eric',
            last_name: 'Ahhg',
            extra: 'ble ble ble',
            edit: {
                first_name: false,
                last_name: false,
                extra: false
            }
        },
        {
            id: 5,
            first_name: 'Alex',
            last_name: 'Ghoey',
            extra: 'zzzz zzz zzz',
            edit: {
                first_name: false,
                last_name: false,
                extra: false
            }
        }
    ];
}
