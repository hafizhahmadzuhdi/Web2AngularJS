import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/task';
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


  constructor(private tasksService: TasksService, private modal: NgbModal) { }

  ngOnInit() {
  	this.getTasks();
  	console.log(this.events);
  	this.viewDate;
  	//this.myFunction();
  	console.log(this.tasks);
  }

  getTasks(): void{
    this.tasksService.getTasks().subscribe(tasks =>{this.tasks = tasks; this.myFunction(); console.log(this.tasks); });
  }

  getTaskDescription(): void{
  	//this.taskdesc = this.tasks.map(task => task.taskID);
  }

  getTaskDueDate(): void{
  	//this.taskduedate = this.tasks.map(task => task.due_date);
  }

  myFunction(): void {
  	this.tasks.map(task => {
  	 this.events.push( {
      //start: startOfDay(new Date()),
      start: startOfDay(new Date(task.due_date)),
      title: task.name,
      color: colors.red
    }
    );
  });
  	console.log(this.tasks);
  }

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;


    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }




}
