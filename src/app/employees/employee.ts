import { Dpt } from '../departments/dpt'

export class Employee {
    id: number;
    first_name: string;
    last_name: string;
    extra: string;
    dpt_id: number;
    dpt: Dpt | null;
}
