import { Injectable } from '@angular/core';
import { Dpt } from './dpt';
import { DEPARTMENTS } from './dptList';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  getDepartments(): Dpt[] {
    return DEPARTMENTS;
  }
}
