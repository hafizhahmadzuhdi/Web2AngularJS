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


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

	tasks: Task[];

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
  	this.getTasks();
  }

  getTasks(): void{
    this.tasksService.getTasks().subscribe(tasks =>this.tasks = tasks);
  }

  viewDate: Date = new Date();


}
