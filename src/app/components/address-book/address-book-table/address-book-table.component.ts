import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/core/models/employee.model';
import { CompareValues, FilterValues } from 'src/app/core/helper/employee-filter';

@Component({
  selector: 'app-address-book-table',
  templateUrl: './address-book-table.component.html',
  styleUrls: ['./address-book-table.component.css']
})
export class AddressBookTableComponent implements OnInit {
  sortBy = 'firstName';
  searchOn = 'firstName';
  searchBy = null;
  fields = [];
  employeesInfoList: Employee[] = [];

  @Input() employeesInfo: Employee[];
  @Output() deleteEmployee = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.employeesInfoList = [ ...this.employeesInfo ];
    this.fields = Object.keys(this.employeesInfoList[0]).filter(x => x !== 'id');
  }
  ngOnChanges() {
    this.employeesInfoList = [ ...this.employeesInfo ];
  }

  onSortSearchBy(prop: string, filterOn, filterBy) {
    let filteredList = [ ...this.employeesInfoList ];
    filteredList = FilterValues(filteredList, filterOn, filterBy);
    return filteredList.sort(CompareValues(prop));
  }

  onEmployeeDelete = (employeeId) => {
    this.deleteEmployee.emit(employeeId);
  }
}
