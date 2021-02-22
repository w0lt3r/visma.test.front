import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/employee'
import { EmployeeFilter } from 'src/app/models/employee-filter'
import { Paginator } from 'src/app/models/common/paginator'
import { Pagination } from 'src/app/models/common/pagination'
import { EmployeeService } from 'src/app/services/employee.service'
import { MatDialog } from '@angular/material/dialog';
import { EmployeeComponent } from 'src/app/modules/main/employee/employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.sass']
})
export class EmployeeListComponent implements OnInit {
  formGroup: FormGroup;
  dataSource = new MatTableDataSource<Employee>();
  columns: string[] = ['firstName', 'lastName', 'socialSecurityNumber', 'phone', 'actions']
  pageSize: number = 4;
  pageNumber: number = 0;
  totalCount: number;
  pageSizeOptions: number[] = [3, 10, 20, 50]
  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.createForm();
    this.search(0);
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      firstName: [null],
      lastName: [null],
      socialSecurityNumber: [null],
      phone: [null],
    })
  }
  clear() {
    this.formGroup.reset();
  }
  async search(page: number) {
    let paginator = new Paginator<EmployeeFilter>(
      new EmployeeFilter(
        this.formGroup.get('firstName').value,
        this.formGroup.get('lastName').value,
        this.formGroup.get('socialSecurityNumber').value,
        this.formGroup.get('phone').value,
      )
      , this.pageSize, page);
    this.pageNumber = page;
    let response = await this.employeeService.list(paginator);
    this.dataSource.data = response.elements;
    this.totalCount = response.totalCount
  }
  async pageChanged(event) {
    this.pageSize = event.pageSize
    this.search(event.pageIndex);
  }
  async add() {
    const dialog = this.matDialog.open(EmployeeComponent);
    dialog.afterClosed().subscribe(reload => {
      if (reload) this.search(0);
    })
  }
}
