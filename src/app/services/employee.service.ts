import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firestore: AngularFirestore) { }

  employeeSubmit(employee: any): Promise<any> {
    return (this.firestore.collection('employees').add(employee));
  }

  /* show dinamycally the  */
  getEmployees(): Observable<any> {
    return (this.firestore.collection('employees', ref => ref.orderBy('first_name', 'asc') ).snapshotChanges());
  }

  /* service: delete an employee from firestore */
  deleteEmployee(id: string): Promise<any> {
    return (this.firestore.collection('employees').doc(id).delete());
  }

  /* method that ask firebase for data when editing */
  getEmployee(id: string): Observable<any> {
    return (this.firestore.collection('employees').doc(id).snapshotChanges());
  }

  /* update employee */
  employeeUpdate(id: string, data:any): Promise<any> {
    return (this.firestore.collection('empleados').doc(id).update(data));
  }
}
