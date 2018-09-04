import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  delete(id) {
      this.employees = this.employees.filter(
          (emp) => {
              return emp.id !== id;
          }
      );
  }

  add() {
      // get the higher id from employees array
      let max_id = Math.max.apply(Math, this.employees.map(
          (emp) => emp.id;
      ));
      this.employees.push(
          {
              id: max_id + 1,
              first_name: this.first_name,
              last_name: this.last_name,
              extra: this.extra,
              show_extra: false
          }
      );
  }

  switch_edit_emp(id, f_name, l_name, extra) {
      // if it's already the current emp we clicked, we just reinit
      if (this.current_edit_emp_id === id)
        this.current_edit_emp_id = null;
      else {
          this.current_edit_emp_id = id;
          this.edit_first_name = f_name;
          this.edit_last_name = l_name;
          this.edit_extra = extra;
      }
  }

  update(id) {
      this.employees.map(
          (emp) => {
              if (emp.id === id) {
                  emp.first_name = this.edit_first_name;
                  emp.last_name = this.edit_last_name;
                  emp.edit_extra = this.edit_extra;
              }
          }
      );
      this.current_edit_emp_id = null;
  }

  employees = [
      {
          id: 0,
          first_name: 'John',
          last_name: 'Doe',
          extra: 'bla bla bla',
          show_extra: false
      },
      {
          id: 1,
          first_name: 'Bob',
          last_name: 'Hee',
          extra: 'bli bli bli',
          show_extra: false
      },
      {
          id: 3,
          first_name: 'Louis',
          last_name: 'Armstrong',
          extra: 'blo blo blo',
          show_extra: false
      },
      {
          id: 4,
          first_name: 'Eric',
          last_name: 'Ahhg',
          extra: 'ble ble ble',
          show_extra: false
      },
      {
          id: 5,
          first_name: 'Alex',
          last_name: 'Ghoey',
          extra: 'zzzz zzz zzz',
          show_extra: false
      }
  ];

}
