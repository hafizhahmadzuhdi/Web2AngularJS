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
  }

  departments: Dpt[];
  employees: Employee[];
  tasks: Task[];
  selectedTask: Task;
  selectedDepartment: Dpt;
  selectedEmployee: Employee;
  selected: string;

  onSelectT(task: Task): void {
    this.selectedTask = task;
    this.selected = "t";
    this.selectedDepartment = null;
    this.selectedEmployee = null;
  }

  onSelectD(dpt: Dpt): void {
    this.selectedDepartment = dpt;
    this.selected = "d";
    this.selectedTask = null;
    this.selectedEmployee = null;
  }

  onSelectE(emp: Employee): void {
    this.selectedEmployee = emp;
    this.selected = "e";
    this.selectedTask = null;
    this.selectedDepartment = null;
  }

  getTasks(): void{
    this.tasksService.getTasks().subscribe(tasks =>this.tasks = tasks);
  }

  getEmployee(): void{
    this.employees = this.employeeService.getAll();
  }

  getDepartments(): void{
    this.departmentService.getDepartments().subscribe(departments =>this.departments = departments);
  }

}
