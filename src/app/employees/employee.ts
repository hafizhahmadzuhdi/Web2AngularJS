import { Dpt } from '../departments/dpt'

export class Employee {
    id: number;
    first_name: string;
    last_name: string;
    birth_date: string | null;
    departement_id: number;
    dpt: Dpt | null;
}
