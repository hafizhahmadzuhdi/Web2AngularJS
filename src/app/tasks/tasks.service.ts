import { Injectable } from '@angular/core';
import { Task } from './task';
/*import { TASKS } from './mytask';*/
// import { EMPLOYEES } from '../employees/employees';
import { DEPARTMENTS } from '../departments/dptList';
import { Employee } from '../employees/employee';
import { Dpt } from '../departments/dpt';
import { Observable, of} from 'rxjs';
import { DepartmentService } from '../departments/department.service';
import { EmployeeService } from '../employees/employee.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksUrl = 'api/tasks';  // URL to web api
  private myTaskUrl = 'http://i875395.hera.fhict.nl/api/420882/task';

  tasks: Task[];

  constructor(private http: HttpClient) {
    this.getTasks().subscribe(mytask => this.tasks = mytask);
  }

  //README.md
  //Service is useful for getting data only
  //The rests method still need to accessed via other component



  getTasks(): Observable<Task[]>{
    //return of(TASKS);
    //return this.http.get<Task[]>(this.myTaskUrl);
    /*.pipe(
      catchError(this.handleError('getTasks', []))
    );*/
    return this.tasks ? of(this.tasks) : this.http.get<Task[]>(this.myTaskUrl);

  }



/*  addEmpToTask(emp: Employee, task_id : number){
    TASKS.map(task => {
      if(task.taskID == task_id) {
        task.emp_id.push(emp;
      }
    });
  }*/



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







/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
/*    this.log(`${operation} failed: ${error.message}`);
*/
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}






}
