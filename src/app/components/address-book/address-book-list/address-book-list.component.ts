import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/models/app-state';
import { Observable } from 'rxjs';
import * as employeeActions from 'src/app/core/store/employee/employee.actions';

@Component({
  selector: 'app-address-book-list',
  templateUrl: './address-book-list.component.html',
  styleUrls: ['./address-book-list.component.css']
})
export class AddressBookListComponent implements OnInit {
  employeeInfoList$: Observable<Employee[]>;
  
  constructor(private store: Store<AppState>) {
    this.employeeInfoList$ = this.store.select(state => state.employees);
  }

  ngOnInit(): void {
    this.getEmployeesInfo();
  }

  getEmployeesInfo = () => {
    this.store.dispatch(employeeActions.EmployeesFetchAction());
  }

  onDeleteEmployee = (employeeId) => {
    this.store.dispatch(employeeActions.EmployeeDeleteAction({employeeId}));
  }
}
