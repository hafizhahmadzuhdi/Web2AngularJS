import { Injectable } from '@angular/core';
import { Dpt } from './dpt';
import { DEPARTMENTS } from './dptList';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  getDepartments(): Observable<Dpt[]> {
    return of(DEPARTMENTS);
  }
  /*getDepartments(): Dpt[] {
    return DEPARTMENTS;
  }
  */
}
