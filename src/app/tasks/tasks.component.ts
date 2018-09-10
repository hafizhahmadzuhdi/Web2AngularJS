import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

	description = null;
	priority = null;
	due_date = null;

	current_taskID = null;
  selected_taskID = null;
  position = null;

	get_description = null;
	get_priority = null;
	get_due_date = null;

  constructor() { }

  ngOnInit() {
  }


  deleteq(taskID){
    if(this.selected_taskID === taskID){
      this.selected_taskID = null;
      this.position = null;
    }
    else {
      this.selected_taskID = taskID;
      this.position = this.tasks.findIndex(task => task.taskID == this.selected_taskID);
      //this.position = this.tasks.indexOf(this.selected_taskID, 1);
    }
    console.log(this.selected_taskID);
    console.log(this.position);
    this.tasks.splice(this.position, 1);
    console.log(this.tasks);
  }



/*  remove(taskID){
    this.tasks.splice(this.tasks.taskID, 1);
    console.log(this.tasks);
  }*/

  insert(){
    let lastID = Math.max.apply(Math, this.tasks.map(task => task.taskID));
    console.log(lastID);
    console.log(this.tasks);
    //this is for getting a last ID for the last object in array
    this.tasks.push(
    {
    taskID: lastID + 1,
    description: this.description,
    priority: this.priority,
    due_date: this.due_date,
    show_more: false
  }
  );
  }

  getValueOfSelectedId(taskID, description, priority, due_date){
    if(this.current_taskID === taskID)
      this.current_taskID = null; //it means that if its already selected return null
    else{ //if no then fill the variable
      this.current_taskID = taskID;
      this.get_description = description;
      this.get_priority = priority;
      this.get_due_date = due_date;
      console.log(this.get_priority);
    }
  }

  edit(taskID){
    this.tasks.map(
      (task) => {
          if(task.taskID === taskID){
            task.description = this.get_description;
            task.priority = this.get_priority;
            task.due_date = this.get_due_date;
          }
      });
    this.current_taskID = null;
  }

  tasks = [
  {
  	taskID: 1001,
  	description: 'Documents Financial Transactions',
  	priority: 'Urgent',
  	due_date: '2018-12-01',
  	show_more: false
  }, 
  {
  	taskID: 1002,
  	description: 'Reconciles Financial Discrepancies',
  	priority: 'Urgent',
  	due_date: '2018-12-01',
  	show_more: false
  },
  {
  	taskID: 1003,
  	description: 'Mails products presentation to prospective buyers',
  	priority: 'Urgent',
  	due_date: '2018-12-01',
  	show_more: false
  },
  {
  	taskID: 1004,
  	description: 'Acquires a new customers',
  	priority: 'Urgent',
  	due_date: '2018-12-01',
  	show_more: false
  },
  {
  	taskID: 1005,
  	description: 'Conducts a Training sessions',
  	priority: 'Urgent',
  	due_date: '2018-12-01',
  	show_more: false
  },
  {
  	taskID: 1006,
  	description:  'Responds customer complaints',
  	priority: 'Urgent',
  	due_date: '2018-12-01',
  	show_more: false
  },
  {
  	taskID: 1007,
  	description:  'Monitors and Evaluates worker performance',
  	priority: 'Medium',
  	due_date: '2018-12-01',
  	show_more: false
  },
  {
  	taskID: 1008,
  	description: 'Creates and Commercializes inventions',
  	priority: 'Urgent',
  	due_date: '2018-12-01',
  	show_more: false
  }
 ];


}
