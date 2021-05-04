import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  /* intialize variable as any type */
  employees: any[] = [];

  constructor(

    /* inject the service in services getEmployee */
    private _emloyeeService: EmployeeService,

    /* a message when delete using toastr */
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    /* getEmployee method onlly executable when component initialization as fololows: */
    this.getEmployees()
  }

  /* method */
  getEmployees() {
    this._emloyeeService.getEmployees().subscribe(data => {

      this.employees = [];

      /* cosole.log(data) to see what is the abstraction */

      /* acces data id */
      data.forEach((element: any) => {

        /* console.log(element.payload.doc.id); <------- ID */

        /* console.log(element.payload.doc.data()); <--- DATA */

        /* javascript push function */
        this.employees.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
        console.log(this.employees)
      });
    });
  }

  /* delete employee event */
  deleteEmployee(id: string) {
    this._emloyeeService.deleteEmployee(id).then(() => {
      console.log('employee deleted successfully');
      this.toastr.error('employee deleted successfully', 'data deleted', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }

  /* create edit employee event */
}
