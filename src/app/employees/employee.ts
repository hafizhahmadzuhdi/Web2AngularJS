export class Employee {
    id: number;
    first_name: string;
    last_name: string;
    extra: string;
    edit: {
        first_name: boolean;
        last_name: boolean;
        extra: boolean;
    }
}
