import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBookListComponent } from './components/address-book/address-book-list/address-book-list.component';
import { AddressBookAddComponent } from './components/address-book/address-book-add/address-book-add.component';

const appRoutes: Routes = [
  {
    path: 'addressbooklist',
    component: AddressBookListComponent,
  },
  {
    path: 'addressbookadd',
    component: AddressBookAddComponent,
  },
  { path: '', redirectTo: '/addressbooklist', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
