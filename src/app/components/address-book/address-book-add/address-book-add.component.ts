import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/models/app-state';
import * as employeeActions from 'src/app/core/store/employee/employee.actions';

@Component({
  selector: 'app-address-book-add',
  templateUrl: './address-book-add.component.html',
  styleUrls: ['./address-book-add.component.css']
})
export class AddressBookAddComponent implements OnInit {
  addressBookForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.addressBookForm.reset();
  }

  onSave(values) {
    if (this.addressBookForm.invalid || !this.addressBookForm.dirty) {
      alert("Please fill all required fields.");
      return;
    }
    this.store.dispatch(employeeActions.EmployeeAddAction({employee: values}));
  }
}
