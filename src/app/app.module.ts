import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressBookListComponent } from './components/address-book/address-book-list/address-book-list.component';
import { EmployeeEffects } from './core/store/employee/employee.effects';
import { EmployeeService } from './core/services/employee.service';
import { AddressBookAddComponent } from './components/address-book/address-book-add/address-book-add.component';
import { employeeReducer } from './core/store/employee';
import { environment } from 'src/environments/environment';
import { AddressBookTableComponent } from './components/address-book/address-book-table/address-book-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddressBookListComponent,
    AddressBookAddComponent,
    AddressBookTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([EmployeeEffects]),
    StoreModule.forRoot({ employees: employeeReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    })
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
