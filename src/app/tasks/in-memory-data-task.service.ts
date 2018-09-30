import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './task';

export class InMemoryDataTaskService implements InMemoryDbService {


  createDb() {
  	const tasks = [
  	{
    taskID: 1001,
    description: 'Documents Financial Transactions',
    priority: 'Urgent',
    due_date: '2018-12-1',
    show_more: false,
    emp_id: 1,
    dept_id: 1
  }, 
  {
    taskID: 1002,
    description: 'Reconciles Financial Discrepancies',
    priority: 'Urgent',
    due_date: '2018-12-1',
    show_more: false,
    emp_id: 1,
    dept_id: 2
  },
  {
    taskID: 1003,
    description: 'Mails products presentation to prospective buyers',
    priority: 'Urgent',
    due_date: '2018-12-1',
    show_more: false,
    emp_id: 1,
    dept_id: 3
  },
  {
    taskID: 1004,
    description: 'Acquires a new customers',
    priority: 'Urgent',
    due_date: '2018-12-1',
    show_more: false,
    emp_id: 0,
    dept_id: 4
  },
  {
    taskID: 1005,
    description: 'Conducts a Training sessions',
    priority: 'Urgent',
    due_date: '2018-9-1',
    show_more: false,
    emp_id: 1,
    dept_id: 4
  },
  {
    taskID: 1006,
    description:  'Responds customer complaints',
    priority: 'Urgent',
    due_date: '2018-12-1',
    show_more: false,
    emp_id: 1,
    dept_id: 4
  },
  {
    taskID: 1007,
    description:  'Monitors and Evaluates worker performance',
    priority: 'Medium',
    due_date: '2018-12-1',
    show_more: false,
    emp_id: 1,
    dept_id: 5
  },
  {
    taskID: 1008,
    description: 'Creates and Commercializes inventions',
    priority: 'Urgent',
    due_date: '2018-12-1',
    show_more: false,
    emp_id: 1,
    dept_id: 6
  }
  ];

  return {tasks};
}

genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.taskID)) + 1 : 1001;
  }

}
