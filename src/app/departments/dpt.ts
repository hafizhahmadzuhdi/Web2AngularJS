import { Employee } from '../employees/employee'

export class Dpt {
    id: number;
    name: string;
    building: string;
    show_extra: boolean = false;
    // emps: Employee[];
    employees: number[];
    empNames: string[];
}
