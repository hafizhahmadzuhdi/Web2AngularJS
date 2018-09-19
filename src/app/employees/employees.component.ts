import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { DepartmentService } from '../departments/department.service';
import { Dpt } from '../departments/dpt';


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
    dpt_id = null;

    employees = [];
    departments = [];

    constructor(private employeeService: EmployeeService, private dptService: DepartmentService) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() : void {
        this.getEmployees();
        this.getDepartments();
        this.addDeptToEmp();
    }

    getEmployees() : void {
        this.employees = this.employeeService.getAll();
    }

    getDepartments() : void {
        //this.departments = this.dptService.getDepartments().subscribe;
        this.dptService.getDepartments().subscribe(data => this.departments = data);
    }

    addDeptToEmp() : void {
        this.employees.map(emp => {
            emp.dpt = this.getDepartmentById(emp.dpt_id);
        })
    }

    delete(id) {
        this.employeeService.delete(id);
        this.refresh();
    }

    add() {
        const emp = this.employeeService.add(this.first_name, this.last_name, this.extra, Number(this.dpt_id));
        this.dptService.addEmpToDept(emp, this.dpt_id);
        this.refresh();
        this.first_name = null;
        this.last_name = null;
        this.extra = null;
        this.dpt_id = null;
    }

    edit(employee, field) {
        this.employeeService.start_editing(employee, field);
    }

    getDepartmentById(dpt_id): Dpt {
        const dep = this.departments.filter(dpt => {
            return dpt.id === dpt_id;
        });
        return dep[0];
    }
}
