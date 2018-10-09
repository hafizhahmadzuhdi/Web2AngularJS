import { Component, OnInit } from '@angular/core';
import { Employee } from '../employees/employee';
import { Task } from './task';
import { Dpt } from '../departments/dpt';
import { TasksService } from './tasks.service';
import { DepartmentService } from '../departments/department.service';
import { EmployeeService } from '../employees/employee.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  description = null;
  priority = null;
  due_date = null;
  emp_id: number[] = [];
  //emp_id = [];
  dept_id = null;

  current_taskID = null;
  selected_taskID = null;
  position = null;//this is a variable for array position

  get_description = null;
  get_priority = null;
  get_due_date = null;
  get_emp_id = null;
  get_dept_id = null;
  get_emp_id2 = null;
  get_employees : number[] = [];

  extra = null;
  sortName: boolean = false;

  add_more : boolean = false;
  emp_number = 0;
  buttonaddemp : boolean = true;
  buttondelemp : boolean = false;


  searchText: string;
  tasks: Task[];
  depts: Dpt[];
  emp: Employee[];

  employees = [];
  departments = [];

  closeResult: string;






  constructor(private modalService: NgbModal, private tasksService: TasksService, private deptService: DepartmentService, private empService: EmployeeService,
  private db: DatabaseService) {
  }
  //generate variable tasksService for service access


  ngOnInit() {
  this.getTasks();
  this.getEmployee();
  this.getDepartments();
}

    persist(){
        this.db.save("tasks", this.tasks);
    }
  //Task datas are not imported in this file, because
  //One of service duties is to get the data itself
  getTasks(): void{
    this.tasksService.getTasks().subscribe(tasks =>this.tasks = tasks);
  }

  getEmployee(): void{
    this.empService.getAll().subscribe(data =>this.emp = data);
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





  deleteq(taskID){
    if(this.selected_taskID === taskID){
      this.selected_taskID = null;
      this.position = null;
    }
    else {
      this.selected_taskID = taskID;
      this.position = this.tasks.findIndex(task => task.id == this.selected_taskID);
      //this.position = this.tasks.indexOf(this.selected_taskID, 1);
    }
    console.log(this.selected_taskID);
    console.log(this.position);
    this.tasks.splice(this.position, 1);
    console.log(this.tasks);
    this.persist();
  }


  insert(){
    let lastID = Math.max.apply(Math, this.tasks.map(task => task.id));
    console.log(lastID);
    console.log(this.tasks);
    if (this.due_date == null) {
      alert("Due date must be entered for all new tasks");
    }
    //this is for getting a last ID for the last object in array
    this.tasks.push(
    {
    id: lastID + 1,
    name: this.description,
    priority: this.priority,
    due_date: this.due_date.year + "-" + this.due_date.month + "-" + this.due_date.day,
    show_more: false,
    /*emp_id: this.tasks.map(taskku => {
      taskku.emp_id.push(this.emp_id);
    }),*/
    employees: this.emp_id.map(Number),
    department_id: Number(this.dept_id),
    department: null,
    emps: []
  }
  );
    console.log(this.emp_id);
    console.log(this.dept_id);
    console.log(this.tasks);
    console.log(this.due_date);
    this.persist();
  }




  switch_edit_task(id, name, priority, due_date, employees, dpt_id) {
        // if it's already the current emp we clicked, we just reinit
        if (this.current_taskID === id)
            this.current_taskID = null;
        else {
            this.current_taskID = id;
            this.get_description = name;
            this.get_priority = priority;
            this.get_due_date = due_date;
            this.get_employees = employees;
            this.get_dept_id = dpt_id;
        }
    }



  edit(taskID){
    this.tasks.map(
      (task) => {
          if(task.id === taskID){
            task.name = this.get_description;
            task.priority = this.get_priority;
            task.due_date = this.get_due_date;
            task.employees[0] = Number(this.get_employees[0]);
            task.employees[1] = Number(this.get_employees[1]);
            task.department_id = Number(this.get_dept_id);
          }
      });
      this.persist();
      this.current_taskID = null;
  }

  show_more(task) {
      task.show_more = !task.show_more;
  }

  addmore_emp(){
  var buttonadd = <HTMLInputElement> document.getElementById("button-add-emp");
  var buttondel = <HTMLInputElement> document.getElementById("button-del-emp");
    {
    this.add_more = true;
    this.emp_number = this.emp_number + 1;
    this.buttonaddemp = false;
    this.buttondelemp = true;
    buttonadd.disabled = true;
    buttondel.disabled = false;
    return this.add_more;
    }
  }

  decrease_emp(){
  var buttonadd = <HTMLInputElement> document.getElementById("button-add-emp");
  var buttondel = <HTMLInputElement> document.getElementById("button-del-emp");

    {
    this.add_more = false;
    this.emp_number = this.emp_number - 1;
    this.buttonaddemp = true;
    this.buttondelemp = false;
    buttonadd.disabled = false;
    buttondel.disabled = true;
    return this.add_more;

  }

}

  sortByName(array: any[]) {
    this.sortName = true;
    array.sort((a,b) => a.name.localeCompare(b.name));
    this.tasks = array;
  }

  sortByID(array: any[]) {
    this.sortName = false;
    array.sort((a: any, b: any) => {
      if (a.id < b.id) {
        return -1;
      } else if (a.id > b.id) {
        return 1;
      } else {
        return 0;
      }
    });
    this.tasks = array;
  }

}
