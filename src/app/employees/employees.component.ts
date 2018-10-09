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
    edit_dpt = null;
    sortFName = true;
    sortLName = false;
    sortID = false;

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

    switch_edit_emp(id, f_name, l_name, birth_date, dpt_id) {
        // if it's already the current emp we clicked, we just reinit
        if (this.current_edit_emp_id === id)
            this.current_edit_emp_id = null;
        else {
            this.current_edit_emp_id = id;
            this.edit_first_name = f_name;
            this.edit_last_name = l_name;
            this.edit_bd = birth_date;
            this.edit_dpt = dpt_id;
        }
    }

    update(id) {
        this.employeeService.update(id, this.edit_first_name, this.edit_last_name, this.edit_bd, this.edit_dpt);
        this.current_edit_emp_id = null;
    }

    show_extra(emp) {
        emp.show_extra = !emp.show_extra;
    }

    sortByFName(array: any[]) {
        this.sortLName = true;
        // this.sortID = true;
        this.sortFName = false;
        array.sort((a,b) => a.first_name.localeCompare(b.first_name));
        this.employees = array;
      }
    
    sortByLName(array: any[]) {
        this.sortID = true;
        this.sortLName = false;
        array.sort((a,b) => a.last_name.localeCompare(b.last_name));
        this.employees = array;
      }
    
      sortByID(array: any[]) {
        this.sortFName = true;
        this.sortID = false;
        array.sort((a: any, b: any) => {
          if (a.id < b.id) {
            return -1;
          } else if (a.id > b.id) {
            return 1;
          } else {
            return 0;
          }
        });
        this.employees = array;
      }
}
