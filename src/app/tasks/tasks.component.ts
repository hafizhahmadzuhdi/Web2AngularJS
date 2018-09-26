import { Component, OnInit } from '@angular/core';
import { Employee } from '../employees/employee';
import { Task } from './task';
import { Dpt } from '../departments/dpt';
import { TasksService } from './tasks.service';
import { DepartmentService } from '../departments/department.service';
import { EmployeeService } from '../employees/employee.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  description = null;
  priority = null;
  due_date = null;
  emp_id = null;
  dept_id = null;

  current_taskID = null;
  selected_taskID = null;
  position = null;//this is a variable for array position

  get_description = null;
  get_priority = null;
  get_due_date = null;
  get_emp_id = null;
  get_dept_id = null;


  searchText: string;
  tasks: Task[];
  depts: Dpt[];
  emp: Employee[];

  employees = [];
  departments = [];

  closeResult: string;


  //

  constructor(private modalService: NgbModal, private tasksService: TasksService, private deptService: DepartmentService, private empService: EmployeeService) { 
  }
  //generate variable tasksService for service access


  ngOnInit() {
  this.getTasks();
  this.getEmployee();
  this.getDepartments();
  /*this.getEmpId();
  this.getDeptId();*/
}

//ngOnInit will initialize when we refreshed our browser

  //Task datas are not imported in this file, because
  //One of service duties is to get the data itself
  getTasks(): void{
    this.tasksService.getTasks().subscribe(tasks =>this.tasks = tasks);
  }

  getEmployee(): void{
    this.emp = this.empService.getAll();
  }

  getDepartments(): void{
    //this.DepartmentService.getDepartments().subscribe(depts =>this.depts = depts);
    this.deptService.getDepartments().subscribe(depts =>this.depts = depts);
    
  }


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



  //Modal Component


/*  getEmpId(): void{
    this.init_emp_id = this.emp.filter(empl => {
    return empl.id }
    );
  }

  getDeptId(): void{
    this.init_dept_id = this.depts.filter(mydep => {
      return mydep.id}
    );
  }*/



/* getTasknDeptnEmp(): void{
    //this.tasksService.getTasks().subscribe(tasks =>this.tasks = tasks);
    //this.EmployeeService.getAll().subscribe(emp =>this.emp = emp);
    //this.tasks = this.tasksService.getTasks();
    //this.depts = this.deptService.getDepartments()
  }*/




/*  getTasks() : void{
    this.tasks = this.tasksService.getAll();
  }

  deleteq(){
    this.tasksService.deleteq(this.selected_taskID);
  }

  edit(current_taskID) {
    this.tasksService.getValueOfSelectedId(this.current_taskID, this.get_description, this.get_priority, this.get_due_date);
    this.tasksService.edit(this.current_taskID);
    this.get_description = null;
    this.get_due_date = null;
    this.get_priority = null;
  }*/



/*  getTasks(): void {
    this.tasksService.getTasks()
    .subscribe(tasks => this.tasks = tasks);
  }*/


  deleteq(taskID){
    if(this.selected_taskID === taskID){
      this.selected_taskID = null;
      this.position = null;
    }
    else {
      this.selected_taskID = taskID;
      this.position = this.tasks.findIndex(task => task.taskID == this.selected_taskID);
      //this.position = this.tasks.indexOf(this.selected_taskID, 1);
    }
    console.log(this.selected_taskID);
    console.log(this.position);
    this.tasks.splice(this.position, 1);
    console.log(this.tasks);
  }

  //when you want to make our project live version
  //you have to typed in this syntax
  //ng build --prod --build-optimizer
  //and



/*  remove(taskID){
    this.tasks.splice(this.tasks.taskID, 1);
    console.log(this.tasks);
  }*/

  insert(){
    let lastID = Math.max.apply(Math, this.tasks.map(task => task.taskID));
    console.log(lastID);
    console.log(this.tasks);
    //this is for getting a last ID for the last object in array
    this.tasks.push(
    {
    taskID: lastID + 1,
    description: this.description,
    priority: this.priority,
    due_date: this.due_date.year + "-" + this.due_date.month + "-" + this.due_date.day,
    show_more: false,
    emp_id: Number(this.emp_id),
    dept_id: Number(this.dept_id)
  }
  );
    console.log(this.emp_id);
    console.log(this.dept_id);
    console.log(this.tasks);
    console.log(this.due_date);
  }
  

  getValueOfSelectedId(taskID, description, priority, due_date, emp_id, dept_id){
    if(this.current_taskID === taskID)
      this.current_taskID = null; //it means that if its already selected return null
    else{ //if no then fill the variable
      this.current_taskID = taskID;
      this.get_description = description;
      this.get_priority = priority;
      this.get_due_date = due_date;
      this.get_emp_id = emp_id;
      this.get_dept_id = dept_id;
      
    }

    console.log(this.get_priority);
    console.log(this.get_description);
    console.log(this.get_due_date);
    console.log(this.get_emp_id);
    console.log(this.get_dept_id);

  }

  edit(taskID){
    this.tasks.map(
      (task) => {
          if(task.taskID === taskID){
            task.description = this.get_description;
            task.priority = this.get_priority;
            task.due_date = this.get_due_date;
            task.emp_id = this.get_emp_id;
            task.dept_id = this.get_dept_id;
          }
      });
    this.current_taskID = null;
  }


}



