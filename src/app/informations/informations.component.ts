import { Component, Input, OnChanges } from '@angular/core';
import { DepartmentService } from '../departments/department.service';
import { EmployeeService } from '../employees/employee.service';
import { Dpt } from '../departments/dpt';
import { Task } from '../tasks/task';
import { Employee } from '../employees/employee';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent {

  constructor(private dptService: DepartmentService, private employeeService: EmployeeService) { }

  @Input() employee: Employee;
  @Input() department: Dpt;
  @Input() task: Task;

  ngOnChanges(){
      if (this.employee)
          this.employee.dpt = this.dptService.getDepartmentById(this.employee.department_id);
      else if (this.department)
        this.department.empNames = this.employeeService.getEmployeesName(this.department.employees);
      else if (this.task){
          this.task.emps = this.employeeService.getEmployees(this.task.employees);
          this.task.department = this.dptService.getDepartmentById(this.task.department_id);
      }
  }


}
