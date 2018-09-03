import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  tasks = ['Documents Financial Transactions', 'Reconciles Financial Discrepancies', 'Mails products presentation to prospective buyers', 'Acquires a new customers', 'Responds customer complaints', 'Conducts a Training sessions', 'Monitors and Evaluates worker performance ', 'Creates and Commercializes inventions'];

}
