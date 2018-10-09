import { Employee } from '../employees/employee'

export class Dpt {
    id: number;
    name: string;
    building: string;
    show_extra: boolean = false;
    employees: number[];
    empNames: string[];
}
