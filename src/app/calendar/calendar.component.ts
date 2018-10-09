import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';
import { DepartmentService } from '../departments/department.service';
import { EmployeeService } from '../employees/employee.service';
import { Task } from '../tasks/task';
import { Employee } from '../employees/employee';
import { Dpt } from '../departments/dpt';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

import { CustomEvent } from './custom_event'

  const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
	@ViewChild('modalContent')
  	modalContent: TemplateRef<any>;

	description : object;

	tasks: Task[];
	taskdesc = null;
	taskduedate = null;
	taskdepartment = null;
	taskpriority = null;
	taskemployee = null;
	task_id = null;
  current_id = null;
  selectedItem: Task | Employee;
  depts: Dpt[];
  emp: Employee[];

  TYPE_EMP = 'emp';
  TYPE_TASK = 'task';

  currentType: string;

  constructor(private tasksService: TasksService, private modal: NgbModal, private deptService: DepartmentService, private empService: EmployeeService) { }

  ngOnInit() {
      this.getEmployee();
      this.getTasks();
      this.getDepartments();
  	  this.viewDate;
  }

  getEmployee(): void{
    this.empService.getAll().subscribe(data =>this.emp = data);
  }

  getDepartments(): void{
    this.deptService.getDepartments().subscribe(depts =>this.depts = depts);
  }

  getTasks(): void{
    this.tasksService.getTasks().subscribe(tasks =>{this.tasks = tasks; this.myFunction();});
  }

    myFunction(): void {
  	    this.tasks.map(task => {
  	        this.events.push(
                {
                    start: startOfDay(new Date(task.due_date)),
                    title: task.name,
                    color: colors.red,
                    id: task.id,
                    type: this.TYPE_TASK
                }
            );
        });
        this.emp.map(emp => {
  	        this.events.push(
                {
                    start: startOfDay(new Date(emp.birth_date)),
                    title: emp.first_name + ' ' + emp.last_name,
                    color: colors.yellow,
                    id: emp.id,
                    type: this.TYPE_EMP
                }
            );
        });
    }

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  events: CustomEvent[] = [];

  activeDayIsOpen: boolean = false;


    dayClicked({ date, events }: { date: Date; events: CustomEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  handleEvent(action: string, event: CustomEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
    this.currentType = event.type;
    if (this.currentType === this.TYPE_TASK)
        this.selectedItem = this.tasksService.getTaskById(event.id);
    else if (this.currentType === this.TYPE_EMP)
        this.selectedItem = this.empService.getEmployeeById(event.id);
  }




}
