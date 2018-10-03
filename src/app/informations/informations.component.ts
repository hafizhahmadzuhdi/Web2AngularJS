import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {

  constructor() { }

  @Input() employee: any[];
  @Input() department: any[];
  @Input() task: any[];

  ngOnInit() {
  }


}
