import { Injectable } from '@angular/core';
import { Task } from './task';
import { TASKS } from './mytask';
import { EMPLOYEES } from '../employees/employees';
import { DEPARTMENTS } from '../departments/dptList';
import { Observable, of} from 'rxjs';
import { DepartmentService } from '../departments/department.service';
import { EmployeeService } from '../employees/employee.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { 

  }

  //README.md
  //Service is useful for getting data only
  //The rests method still need to accessed via other component

  getTasks(): Observable<Task[]>{
    return of(TASKS);
  }



/*  deleteq(taskID: number){
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
  }*/



/*  remove(taskID){
    this.tasks.splice(this.tasks.taskID, 1);
    console.log(this.tasks);
  }*/

/*  insert(description: string, priority: string, due_date: string){
    let lastID = Math.max.apply(Math, this.tasks.map(task => task.taskID));
    console.log(lastID);
    console.log(this.tasks);
    //this is for getting a last ID for the last object in array
    this.tasks.push(
    {
    taskID: lastID + 1,
    description: this.description,
    priority: this.priority,
    due_date: this.due_date,
    show_more: false
  }
  );
  }

  getValueOfSelectedId(taskID: number, description: string, priority: string, due_date: string){
    if(this.current_taskID === taskID)
      this.current_taskID = null; //it means that if its already selected return null
    else{ //if no then fill the variable
      this.current_taskID = taskID;
      this.get_description = description;
      this.get_priority = priority;
      this.get_due_date = due_date;
      console.log(this.get_priority);
    }
  }

  edit(taskID: number){
    this.tasks.map(
      (task) => {
          if(task.taskID === taskID){
            task.description = this.get_description;
            task.priority = this.get_priority;
            task.due_date = this.get_due_date;
          }
      });
    this.current_taskID = null;
  }*/









}
