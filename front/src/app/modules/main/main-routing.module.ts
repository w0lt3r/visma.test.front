import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from 'src/app/modules/main/employee-list/employee-list.component';
import { HomeComponent } from 'src/app/modules/main/home/home.component';
import { MainComponent } from 'src/app/modules/main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'employee', component: EmployeeListComponent }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
