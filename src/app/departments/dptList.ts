import { Dpt } from './dpt';

export const DEPARTMENTS: Dpt[] = [
    { id: 1, name: 'Accounting', building: 'R1', show_extra: false, /*emps: [],*/ employees: [1], empNames: [] },
    { id: 2, name: 'Customer Service', building: 'R3', show_extra: false, /*emps: [], */employees: [0], empNames: [] },
    { id: 3, name: 'Human Resources', building: 'R2', show_extra: false, /*emps: [], */employees: [0], empNames: [] },
    { id: 4, name: 'Payroll', building: 'R5', show_extra: false, /*emps: [], */employees: [2], empNames: [] },
    { id: 5, name: 'Research and Development', building: 'R1', show_extra: false/*, emps: []*/, employees: [2], empNames: [] },
    { id: 6, name: 'Sales', building: 'R2', show_extra: false, /*emps: [], */employees: [2], empNames: [] }
]