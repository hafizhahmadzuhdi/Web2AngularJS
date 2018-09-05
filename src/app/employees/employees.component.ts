import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';


@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {

    // initalizing our templates variables
    first_name = null;
    last_name = null;
    extra = null;

    current_edit_emp_id = null;

    edit_first_name = null;
    edit_last_name = null;
    edit_extra = null;

    employees = [];

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit() {
        this.getEmployees();
    }

    getEmployees() : void {
        this.employees = this.employeeService.getAll();
    }

    delete(id) {
        this.employeeService.delete(id);
        this.getEmployees();
    }

    add() {
        this.employeeService.add(this.first_name, this.last_name, this.extra);
        this.getEmployees();
    }

    update(id) {
        this.employeeService.update(id, this.edit_first_name, this.edit_last_name, this.edit_extra);
        this.current_edit_emp_id = null;
    }

    // used to make sure only one of the employees is being edited at a time (ux choice)
    switch_edit_emp(id, f_name, l_name, extra) {
        // if it's already the current emp we clicked, we just reinit
        if (this.current_edit_emp_id === id)
            this.current_edit_emp_id = null;
        else {
            this.current_edit_emp_id = id;
            this.edit_first_name = f_name;
            this.edit_last_name = l_name;
            this.edit_extra = extra;
        }
    }
}
