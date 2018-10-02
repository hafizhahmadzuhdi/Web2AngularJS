import { Dpt } from './dpt';

export const DEPARTMENTS: Dpt[] = [
    { id: 145, name: 'Accounting', building: 'R1', show_extra: false, /*emps: [],*/ employees: [1], empNames: [] },
    { id: 146, name: 'Customer Service', building: 'R3', show_extra: false, /*emps: [], */employees: [0], empNames: [] },
    { id: 147, name: 'Human Resources', building: 'R2', show_extra: false, /*emps: [], */employees: [0], empNames: [] },
    { id: 148, name: 'Payroll', building: 'R5', show_extra: false, /*emps: [], */employees: [2], empNames: [] },
    { id: 149, name: 'Research and Development', building: 'R1', show_extra: false/*, emps: []*/, employees: [2], empNames: [] },
    { id: 150, name: 'Sales', building: 'R2', show_extra: false, /*emps: [], */employees: [2], empNames: [] }
]
