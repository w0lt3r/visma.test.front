import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [MainComponent, EmployeeListComponent, EmployeeComponent, HomeComponent],
  imports: [
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
