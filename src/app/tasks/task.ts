import { Dpt } from '../departments/dpt';
import { Employee } from '../employees/employee';

export class Task {
	id: number;
	name: string;
	priority: string;
	due_date: string;
	show_more: boolean;
	employees: number[];
	department_id: number;
	department: Dpt;
	emps: Employee[] | null;
}
