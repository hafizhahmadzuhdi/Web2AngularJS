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
    this.searchCategory = "tCheck";
  }

  departments: Dpt[];
  employees: Employee[];
  tasks: Task[];
  selectedTask: Task;
  selectedDepartment: Dpt;
  selectedEmployee: Employee;
  selected: string;
  searchTsk: string;
  searchDpt: string;
  searchEmp: string;
  tCheck: string;
  dCheck: string;
  eCheck: string;
  searchCategory: string;

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
    this.employeeService.getAll().subscribe(data =>this.employees = data);
  }

  getDepartments(): void{
    this.departmentService.getDepartments().subscribe(departments =>this.departments = departments);
  }

  reset(): void {
    this.searchTsk = null;
    this.searchDpt = null;
    this.searchEmp = null;
  }

  isAssociated(type, entity){
      let resp = false;
        switch (type) {
            case 'dpt':
                if (this.selectedEmployee && entity.id === this.selectedEmployee.department_id
                    || this.selectedTask && this.selectedTask.department_id === entity.id
                )
                    resp = true;
                break;
            case "emp":
                if (this.selectedTask && this.selectedTask.employees.includes(entity.id)
                    || this.selectedDepartment && this.selectedDepartment.employees.includes(entity.id)
                )
                    resp = true;
                break;
            case "task":
                if (this.selectedDepartment && entity.department_id === this.selectedDepartment.id
                    || this.selectedEmployee && entity.employees.includes(this.selectedEmployee.id))
                    resp = true;
                break;
      }
      return resp;
  }
}
