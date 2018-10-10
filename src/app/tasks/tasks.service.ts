import { Injectable } from '@angular/core';
import { Task } from './task';
import { Employee } from '../employees/employee';
import { Dpt } from '../departments/dpt';
import { Observable, of} from 'rxjs';
import { DepartmentService } from '../departments/department.service';
import { EmployeeService } from '../employees/employee.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { DatabaseService } from '../database.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksUrl = 'api/tasks';  // URL to web api
  private myTaskUrl = 'http://i875395.hera.fhict.nl/api/420882/task';

  tasks: Task[];

  constructor(private http: HttpClient, private db: DatabaseService) {
    this.getTasks().subscribe(mytask => {
        this.tasks = mytask;
        // saving some due_dates to show on calendar without having to modify it
        if (this.tasks[0] && !this.tasks[0].due_date)
            this.tasks[0].due_date = '2018-10-15';

        if (this.tasks[2] && !this.tasks[2].due_date)
            this.tasks[2].due_date = '2018-11-10';
        this.db.save('tasks', this.tasks);
    });
  }

  getTasks(): Observable<Task[]>{
    this.tasks = this.db.getTasks();
    return this.tasks ? of(this.tasks) : this.http.get<Task[]>(this.myTaskUrl);

  }

  getTaskById(task_id) {
        const tsk = this.tasks.filter(tsk => {
            return tsk.id === task_id;
        });
        return tsk[0];
    }

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
