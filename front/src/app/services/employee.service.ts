import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpSuccessWrapper } from 'src/app/models/common/http-success-wrapper';
import { Pagination } from 'src/app/models/common/pagination';
import { Paginator } from 'src/app/models/common/paginator';
import { Employee } from 'src/app/models/employee';
import { EmployeeFilter } from 'src/app/models/employee-filter';
import { EmployeeInsert } from 'src/app/models/employee-insert';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  controller = 'Employee'
  // employees: Employee[] = [
  //   {
  //     firstName: 'firstName',
  //     lastName: 'lastName',
  //     socialSecurityNumber: 'socialSecurityNumber',
  //     phone: 'phone'
  //   },
  //   {
  //     firstName: 'firstName',
  //     lastName: 'lastName',
  //     socialSecurityNumber: 'socialSecurityNumber',
  //     phone: 'phone'
  //   },
  //   {
  //     firstName: 'firstName',
  //     lastName: 'lastName',
  //     socialSecurityNumber: 'socialSecurityNumber',
  //     phone: 'phone'
  //   },
  //   {
  //     firstName: 'firstName2',
  //     lastName: 'lastName2',
  //     socialSecurityNumber: 'socialSecurityNumber2',
  //     phone: 'phone2'
  //   },
  //   {
  //     firstName: 'firstName2',
  //     lastName: 'lastName2',
  //     socialSecurityNumber: 'socialSecurityNumber2',
  //     phone: 'phone2'
  //   },
  //   {
  //     firstName: 'firstName2',
  //     lastName: 'lastName2',
  //     socialSecurityNumber: 'socialSecurityNumber2',
  //     phone: 'phone2'
  //   },
  //   {
  //     firstName: 'firstName3',
  //     lastName: 'lastName3',
  //     socialSecurityNumber: 'socialSecurityNumber3',
  //     phone: 'phone3'
  //   },
  //   {
  //     firstName: 'firstName3',
  //     lastName: 'lastName3',
  //     socialSecurityNumber: 'socialSecurityNumber3',
  //     phone: 'phone3'
  //   },
  //   {
  //     firstName: 'firstName3',
  //     lastName: 'lastName3',
  //     socialSecurityNumber: 'socialSecurityNumber3',
  //     phone: 'phone3'
  //   },
  // ]
  constructor(private httpClient: HttpClient) { }

  list(paginator: Paginator<EmployeeFilter>) {
    const url = `${environment.apiUrl}${this.controller}`;
    let httpParams = new HttpParams();
    if (paginator.filter.firstName != null) httpParams = httpParams.append('Filter.FirstName', paginator.filter.firstName);
    if (paginator.filter.lastName != null) httpParams = httpParams.append('Filter.LastName', paginator.filter.lastName);
    if (paginator.filter.socialSecurityNumber != null) httpParams = httpParams.append('Filter.SocialSecurityNumber', paginator.filter.socialSecurityNumber);
    if (paginator.filter.phone != null) httpParams = httpParams.append('Filter.Phone', paginator.filter.phone);
    httpParams = httpParams.append('Count', paginator.pageSize.toString());
    httpParams = httpParams.append('Page', paginator.pageNumber.toString());
    return this.httpClient.get<Pagination<Employee>>(url, { params: httpParams }).toPromise();
  }
  add(employee: EmployeeInsert) {
    const url = `${environment.apiUrl}${this.controller}`;
    return this.httpClient.post<HttpSuccessWrapper<Employee>>(url, employee).toPromise();
  }
}

