import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employees/employee.service';
import { DepartmentService } from '../departments/department.service';
import { Dpt } from '../departments/dpt';
import { Employee } from '../employees/employee'
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private tasksService: TasksService, private departmentService: DepartmentService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getTasks();
    this.getEmployee();
    this.getDepartments();
    //this.departmentService.addEmpToDept(this.departments, this.employees);
    //this.employeeService.addDeptToEmp(this.departments);
  }

  departments: Dpt[];
  employees: Employee[];
  tasks: Task[];
  selectedTask: Task;
  selectedDepartment: Dpt;
  selectedEmployee: Employee;
  selected: string;
  searchDpt: string;
  searchEmp: string;

  onSelectT(task: Task): void {
    this.selectedTask = task;
    this.selectedTask.emps = this.employeeService.getEmployees(task.employees);
    this.selectedTask.department = this.departmentService.getDepartmentById(task.department_id);
    this.selected = "t";
    this.selectedDepartment = null;
    this.selectedEmployee = null;
    // this.scrollToSelectedElement();
  }

  onSelectD(dpt: Dpt): void {
    this.selectedDepartment = dpt;
    this.selectedDepartment.empNames = this.employeeService.getEmployeesName(dpt.employees);
    this.selected = "d";
    this.selectedTask = null;
    this.selectedEmployee = null;
    // this.scrollToSelectedElement();
  }

  onSelectE(emp: Employee): void {
    this.selectedEmployee = emp;
    this.selectedEmployee.dpt = this.departmentService.getDepartmentById(emp.department_id);
    this.selected = "e";
    this.selectedTask = null;
    this.selectedDepartment = null;
    // this.scrollToSelectedElement();
  }

  getTasks(): void{
    this.tasksService.getTasks().subscribe(tasks =>this.tasks = tasks);
  }

  getEmployee(): void{
    //this.employees = this.employeeService.getAll();
    this.employeeService.getAll().subscribe(data =>this.employees = data);
  }

  getDepartments(): void{
    this.departmentService.getDepartments().subscribe(departments =>this.departments = departments);
  }

  // scrollToSelectedElement() {
  //     const selectedElement = document.getElementById("selectedElement");
  //     selectedElement.scrollIntoView();
  // }
}
