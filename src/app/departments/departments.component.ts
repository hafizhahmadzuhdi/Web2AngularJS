import { Component, OnInit } from '@angular/core';
import { Dpt } from './dpt';
import { _appIdRandomProviderFactory } from '@angular/core/src/application_tokens';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})

export class DepartmentsComponent implements OnInit {

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.getDepartments();
  }

  id: null;
  name: null;
  description: null;
  currentDptId: null;
  editName: null;
  editDescription: null;

  departments: Dpt[];
  
  getDepartments(): void {
    this.departments = this.departmentService.getDepartments();
  }
  
  addDpt() {
    //Gets ID last used for department object for new department id's to continue from
    let prevId = Math.max.apply(Math, this.departments.map(department => department.id));
    this.departments.push({
      id: prevId + 1,
      name: this.name,
      description: this.description,
      show_extra: false
    });
  }

  //Turns the current department into a form in order to edit the values
  editForm(id, name, description) {
    if(this.currentDptId === id) //if already in form/edit
      this.currentDptId = null;  //put back into read view
    else{
      this.currentDptId = id;
      this.editName = name; //put value in for user to see
      this.editDescription = description;
    }
  }

  updateDpt(id) {
    let n = this.departments.find(x => x.id === id); //find object to be edited
    n.name = this.editName;
    n.description = this.editDescription;
    this.currentDptId = null;
  }

  deleteDpt(id) {
    let i = this.departments.findIndex(x => x.id === id);
    this.departments.splice(i, 1);
  }

}
