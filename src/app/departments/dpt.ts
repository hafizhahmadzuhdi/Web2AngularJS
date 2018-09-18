import { Employee } from '../employees/employee'

export class Dpt {
    id: number;
    name: string;
    description: string;
    show_extra: boolean;
    emps: Employee[];
    empNames: string[];
}