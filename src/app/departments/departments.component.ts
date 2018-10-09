import { Component, OnInit } from '@angular/core';
import { Dpt } from './dpt';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';
import { DepartmentService } from './department.service';
import { Employee } from '../employees/employee' //
import { EmployeeService } from '../employees/employee.service';
import { Task } from '../tasks/task';
import { TasksService } from '../tasks/tasks.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})

export class DepartmentsComponent implements OnInit {

  constructor(private departmentService: DepartmentService, private employeeService: EmployeeService, private modalService: NgbModal, private tasksService: TasksService) { }

  ngOnInit() {
    this.getDepartments();
    this.getEmployees();
    this.getTasks();
    // this.addEmpToDept(this.departments);
  }

  id: null;
  name: null;
  building: null;
  currentDptId: null;
  currentDptId2: null;
  editName: null;
  editBuilding: null;
  emps: null;
  empNames: null;
  searchText: string;

  departments: Dpt[];
  employees: Employee[];
  tasks: Task[];

  closeResult: string;
  task_due_date;
  taskDescription: null;
  taskPriority: null;
  taskEmpId: number[] = [];
  taskDeptId;

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments =>this.departments = departments);
  }

  getEmployees() : void {
    this.employeeService.getAll().subscribe(data => this.employees = data);
  }

  getTasks(): void{
    this.tasksService.getTasks().subscribe(tasks =>this.tasks = tasks);
  }

  addDpt() {
    let prevId = Math.max.apply(Math, this.departments.map(department => department.id));
    this.departments.push({
      id: prevId + 1,
      name: this.name,
//!!!!!!!!!!!!!!!!!!!!!!!! THE SHOW MORE ISN'T SHOWING ID, BUILDING AND THE REST.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      building: this.building, 
      show_extra: false,
      employees: null,
      empNames: null
    });
  }

  //Turns the current department into a form in order to edit the values
  editForm(id, name, building) {
    if(this.currentDptId === id) //if already in form/edit
      this.currentDptId = null;  //put back into read view
    else{
      this.currentDptId = id;
      this.editName = name; //put value in for user to see
      this.editBuilding = building;
    }
  }

  addTaskForm(id) {
    const dep = this.departmentService.getDepartmentById(id);
    if(this.currentDptId === id) //if already in form/edit
      this.currentDptId = null;  //put back into read view
    else{
      this.currentDptId = id;
      this.editName = name; //put value in for user to see
    }
  }

  updateDpt(id) {
    let n = this.departments.find(x => x.id === id); //find object to be edited
    n.name = this.editName;
    n.building = this.editBuilding;
    this.currentDptId = null;
  }

  deleteDpt(id) {
    let i = this.departments.findIndex(x => x.id === id);
    this.departments.splice(i, 1);
  }

  show_extra(dpt) {
      dpt.show_extra = !dpt.show_extra;
      if (dpt.show_extra){
          dpt.empNames = this.employeeService.getEmployeesName(dpt.employees);
      }
  }

  pullCurrentDptId(id) {
    this.currentDptId2 = id;
  }

  insertTask() {
    let lastID = Math.max.apply(Math, this.tasks.map(task => task.id));
    if (this.task_due_date == null) {
      alert("Due date must be entered for all new tasks");
    }
    this.tasks.push({
      id: lastID + 1,
      name: this.taskDescription,
      priority: this.taskPriority,
      due_date: this.task_due_date.year + "-" + this.task_due_date.month + "-" + this.task_due_date.day,
      show_more: false,
      employees: this.taskEmpId.map(Number),
      department_id: this.currentDptId2,
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!THIS STUPID DEPARTMENT ISN'T GETTING PUSHED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      department: this.departmentService.getDepartmentById(this.currentDptId2),
      emps: []
    });
    this.taskDescription = null;
    this.taskPriority = null;
    this.task_due_date = null;
    this.taskEmpId = [];
  }

  // Modal Stuff
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!OTHER BUGS. sry yall!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//ONCE A TASK IS ADDED FROM DEPARTMENTS, IT DOESN'T SHOW UP IN CALENDER. and when going back to tasks, it no longer lets me scroll.
//Tasks in the calendar are still showing up under ID, not the task description.