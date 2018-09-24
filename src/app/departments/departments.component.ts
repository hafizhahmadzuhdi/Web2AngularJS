import { Component, OnInit } from '@angular/core';
import { Dpt } from './dpt';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';
import { DepartmentService } from './department.service';
import { Employee } from '../employees/employee' //
import { EmployeeService } from '../employees/employee.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})

export class DepartmentsComponent implements OnInit {

  constructor(private departmentService: DepartmentService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getDepartments();
    this.getEmployees();
    this.addEmpToDept();
  }

  id: null;
  name: null;
  description: null;
  currentDptId: null;
  editName: null;
  editDescription: null;
  emps: null;
  empNames: null;
  searchText: string;

  departments: Dpt[];
  employees: Employee[];

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments =>this.departments = departments);
  }

  getEmployees() : void {
    this.employees = this.employeeService.getAll();
  }

  //Makes adding an employee to a department easier
  eToD = (x, y)=>this.departments[x].emps.push(this.employees[y]);
  eToDNames = (x, y)=>this.departments[x].empNames.push(this.employees[y].first_name + ' ' + this.employees[y].last_name);

  addEmpToDept() {
    this.eToD(0, 1); //department with index 0 gets pushed employee of index 1
    this.eToDNames(0, 1);
    this.eToD(0, 2);
    this.eToDNames(0, 2);
    this.eToD(1, 0);
    this.eToDNames(1, 0);
  }

  addDpt() {
    //Gets ID last used for department object for new department id's to continue from
    let prevId = Math.max.apply(Math, this.departments.map(department => department.id));
    this.departments.push({
      id: prevId + 1,
      name: this.name,
      description: this.description,
      show_extra: false,
      emps: this.emps,
      empNames: this.empNames
    });
  }

  //Turns the current department into a form in order to edit the values
  editForm(id, name, description) {
    if(this.currentDptId === id) //if already in form/edit
      this.currentDptId = null;  //put back into read view
    else{
      this.currentDptId = id;
      this.editName = name; //put value in for user to see
      this.editDescription = description;
    }
  }

  updateDpt(id) {
    let n = this.departments.find(x => x.id === id); //find object to be edited
    n.name = this.editName;
    n.description = this.editDescription;
    this.currentDptId = null;
  }

  deleteDpt(id) {
    let i = this.departments.findIndex(x => x.id === id);
    this.departments.splice(i, 1);
  }

}
