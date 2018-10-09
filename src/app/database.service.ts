import { Injectable } from '@angular/core';
import { Employee } from './employees/employee';
import { Dpt } from './departments/dpt';
import { Task } from './tasks/task';

@Injectable({
  providedIn: 'root'
})

// this service is not used atm, we will use it to store db in localstorage
export class DatabaseService {

    constructor() { }

    getEmployees(): Employee[] {
        try {
            const data = localStorage.getItem('employees');
            if (data){
                return JSON.parse(data);
            }
            else
                return undefined;
        } catch (e) {
            console.log(e);
        }
    }

    getDepartments(): Dpt[] {
        try {
            const data = localStorage.getItem('dpts');
            if (data){
                return JSON.parse(data);
            }
            else
                return undefined;
        } catch (e) {
            console.log(e);
        }
    }

    getTasks(): Task[] {
        try {
            const data = localStorage.getItem('tasks');
            if (data){
                return JSON.parse(data);
            }
            else
                return undefined;
        } catch (e) {
            console.log(e);
        }
    }

  save(item_name: string, item): void {
      try {
          localStorage.setItem(item_name, JSON.stringify(item));
      } catch (e) {
          console.log(e);
      }
  }
}
