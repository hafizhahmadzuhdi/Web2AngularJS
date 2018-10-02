import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './task';


//in memory is used to be an API that stored our data there

export class InMemoryDataTaskService implements InMemoryDbService {


  createDb() {
  	const tasks = [
  	{
    id: 1001,
    name: 'Documenting Financial Transactions',
    priority: 'Urgent',
    due_date: '2018-10-1',
    show_more: false,
    employees: [1,2],
    department_id: 1
  }, 
  {
    id: 1002,
    name: 'Reconciles Financial Discrepancies',
    priority: 'Urgent',
    due_date: '2018-10-1',
    show_more: false,
    employees: [1,2],
    department_id: 2
  },
  {
    id: 1003,
    name: 'Mails products presentation to prospective buyers',
    priority: 'Urgent',
    due_date: '2018-10-1',
    show_more: false,
    employees: [1,2],
    department_id: 3
  },
  {
    id: 1004,
    name: 'Acquires a new customers',
    priority: 'Urgent',
    due_date: '2018-10-1',
    show_more: false,
    employees: [1,2],
    department_id: 4
  },
  {
    id: 1005,
    name: 'Conducts a Training sessions',
    priority: 'Urgent',
    due_date: '2018-9-1',
    show_more: false,
    employees: [1,2],
    department_id: 4
  },
  {
    id: 1006,
    name:  'Responds customer complaints',
    priority: 'Urgent',
    due_date: '2018-10-2',
    show_more: false,
    employees: [1,2],
    department_id: 4
  },
  {
    id: 1007,
    name:  'Monitors and Evaluates worker performance',
    priority: 'Medium',
    due_date: '2018-10-11',
    show_more: false,
    employees: [1,2],
    departemnt_id: 5
  },
  {
    id: 1008,
    name: 'Creates and Commercializes inventions',
    priority: 'Urgent',
    due_date: '2018-12-14',
    show_more: false,
    employees: [1,2],
    department_id: 6
  }
  ];

  return {tasks};
}

genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1001;
  }

}
