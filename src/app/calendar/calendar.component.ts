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
	
	description : object;

	tasks: Task[];

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
  	this.getTasks();
  	console.log(this.tasks);
  	this.getTaskDescription();
  }

  getTasks(): void{
    this.tasksService.getTasks().subscribe(tasks =>this.tasks = tasks);
  }

  getTaskDescription(): void{
  	this.description = this.tasks['description'];
  }


  viewDate: Date = new Date();
  
  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'Doing presentation to the client',
      color: colors.red,
    }
  ];
 


}
