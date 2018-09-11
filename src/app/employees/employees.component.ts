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
        this.first_name = null;
        this.last_name = null;
        this.extra = null;
    }

    edit(employee, field) {
        switch (field) {
            case 'first_name':
                this.employeeService.start_editing(employee, 'first_name');
                break;
            case 'last_name':
                this.employeeService.start_editing(employee, 'last_name');
                break;
            case 'extra':
                this.employeeService.start_editing(employee, 'extra');
                break;
        }
    }
}
