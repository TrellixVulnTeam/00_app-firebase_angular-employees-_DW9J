import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeCreateComponent } from './components/employee-create/employee-create.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { EmployeeService } from './services/employee.service';

const routes: Routes = [
  /* mapping modules service and create */

  /* if nothing redirect to employee list comparing all path*/
  { path: '', redirectTo: 'employees-list', pathMatch: 'full' },

  /* mapping employees list component */
  { path: 'employees-list', component: EmployeesListComponent },

  /* mapping employees list component */
  { path: 'employee-create', component: EmployeeCreateComponent },

  /* edit icon parsing as a dynamic parameter */
  { path: 'employee-edit/:id', component: EmployeeCreateComponent },

  /* if not found anything ** wildcard */
  { path: '**', redirectTo: 'employees-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
