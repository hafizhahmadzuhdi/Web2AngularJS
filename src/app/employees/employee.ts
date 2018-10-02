import { Dpt } from '../departments/dpt'

export class Employee {
    id: number;
    first_name: string;
    last_name: string;
    birth_date: string | null;
    department_id: number;
    dpt: Dpt | null;
}
