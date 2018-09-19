import { Employee } from './employee';

export const EMPLOYEES: Employee[] = [
    {
        id: 0,
        first_name: 'Bob',
        last_name: 'Yo',
        extra: 'this is an extra',
        edit: {
            first_name: false,
            last_name: false,
            extra: false
        },
        dpt_id: 2
    },
    {
        id: 1,
        first_name: 'Tero',
        last_name: 'Tooo',
        extra: 'this is an extr bis a',
        edit: {
            first_name: false,
            last_name: false,
            extra: false
        },
        dpt_id: 5
    },
    {
        id: 2,
        first_name: 'Heee',
        last_name: 'Tooo',
        extra: 'blbl',
        edit: {
            first_name: false,
            last_name: false,
            extra: false
        },
        dpt_id: 3
    },
]
