import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  /* create a new variable */
  employeeCreate: FormGroup;

  /* create the save variable F as default */
  subbmitted = false;

  /* spinner only when submit */
  loading = false;

  /* string type when editted and null type when create */
  event_title = 'Add Emplopyee';
  id: string | null;

  /* ---------------------------------------------------- */

  constructor(

    /* inject a new class as formbuilder type*/
    private form_builder: FormBuilder,

    /* inject to firebase store */
    private _employeeService: EmployeeService,

    /* to link the employee table to firestore */
    private router: Router,

    private toastr: ToastrService,

    /* catch the string id when edit with aRoute class */
    private aRoute: ActivatedRoute

  ) {

    this.employeeCreate = this.form_builder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      document_id: ['', Validators.required],
      salary: ['', Validators.required]
    })

    /* acces the id */
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.employeeEdit();
  }

  /* method to submit the data to DB */
  employeeSubmitEdit() {

    this.subbmitted = true;

    if (this.employeeCreate.invalid) {
      return;
    }

    if (!this.id) {
      this.employeeSubmit();
    }

  }

  employeeSubmit() {

    const employee: any = {
      /* property */
      first_name: this.employeeCreate.value.first_name,
      last_name: this.employeeCreate.value.last_name,
      document_id: this.employeeCreate.value.document_id,
      salary: this.employeeCreate.value.salary,
      creation_date: new Date(),
      update_date: new Date()
    }

    /* spinner when employeesubmit */
    this.loading = true;

    /* send to firebase store */
    this._employeeService.employeeSubmit(employee).then(
      () => {

        /* prompt window to succes message and possitiones*/
        this.toastr.success('employee submission succesfull', 'employee submited', {
          positionClass: 'toast-bottom-right'
        });

        /* set false the spinner when done */
        this.loading = false;

        /* when succes */
        this.router.navigate(['/employees-list'])
      }).catch(error => {
        console.log(error);

        /* if error hide */
        this.loading = false;
      })

  }

  /* When update no need to create */
  update(id: string) {

    const employee: any = {
      /* property */
      first_name: this.employeeCreate.value.first_name,
      last_name: this.employeeCreate.value.last_name,
      document_id: this.employeeCreate.value.document_id,
      salary: this.employeeCreate.value.salary,

      /* creation_date: new Date(), */
      update_date: new Date()
    }

    this.loading = true;

    this._employeeService.employeeUpdate(id, employee).then(() => {
      this.loading = false;
      this.toastr.info('Employee data update succesfull', 'Employee updated', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/employees-list']);
    })
  }

  employeeEdit() {
    if (this.id !== null) {
      this.event_title = 'Edit Employee'
      this.loading = true;
      this._employeeService.getEmployee(this.id).subscribe(data => {
        this.loading = false;

        /* set values when edit each field */
        this.employeeCreate.setValue({
          first_name: data.payload.data()['first_name'],
          last_name: data.payload.data()['last_name'],
          document_id: data.payload.data()['document_id'],
          salary: data.payload.data()['salary']
        })
      })
    }
  }
}
