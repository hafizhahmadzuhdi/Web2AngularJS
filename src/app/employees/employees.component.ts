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
    birth_date = null;
    department_id = null;
    current_edit_emp_id = null;
    edit_first_name = null;
    edit_last_name = null;
    edit_bd = null;

    search = null;

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
    }

    getEmployees() : void {
        this.employeeService.getAll().subscribe(data => this.employees = data);
    }

    getDepartments() : void {
        this.dptService.getDepartments().subscribe(data => this.departments = data);
    }

    delete(id) {
        this.employeeService.delete(id);
        this.refresh();
    }

    add() {
        const emp = this.employeeService.add(this.first_name, this.last_name, this.birth_date, Number(this.department_id));
        this.dptService.addDeptToEmp(emp, this.department_id);
        this.refresh();
        this.first_name = null;
        this.last_name = null;
        this.birth_date = null;
        this.department_id = null;
    }

    switch_edit_emp(id, f_name, l_name, birth_date) {
        // if it's already the current emp we clicked, we just reinit
        if (this.current_edit_emp_id === id)
            this.current_edit_emp_id = null;
        else {
            this.current_edit_emp_id = id;
            this.edit_first_name = f_name;
            this.edit_last_name = l_name;
            this.edit_bd = birth_date;
        }
    }

    update(id) {
        this.employees.map(
            (emp) => {
                if (emp.id === id) {
                    emp.first_name = this.edit_first_name;
                    emp.last_name = this.edit_last_name;
                    emp.birth_date = this.edit_bd;
                }
            }
        );
        this.current_edit_emp_id = null;
    }

    show_extra(emp) {
        emp.show_extra = !emp.show_extra;
        if (emp.show_extra)
            emp.dpt = this.dptService.getDepartmentById(emp.department_id);
    }
}
