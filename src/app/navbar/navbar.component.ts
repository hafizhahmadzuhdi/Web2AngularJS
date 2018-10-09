import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private db: DatabaseService) { }

  ngOnInit() {
  }

  clear_local_storage(){
      this.db.clearAll();
      location.reload();
  }

}
