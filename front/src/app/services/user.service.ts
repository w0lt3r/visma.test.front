import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { HttpSuccessWrapper } from 'src/app/models/common/http-success-wrapper'
import { LoginResponse } from 'src/app/models/login-response'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  controller = 'User'
  constructor(private httpClient: HttpClient) { }
  
  getAccess(userName: string, password: string) {
    const url = `${environment.apiUrl}${this.controller}/Access`;
    let httpParams = new HttpParams();
    httpParams = httpParams.append('username', userName);
    httpParams = httpParams.append('password', password);
    return this.httpClient.get<HttpSuccessWrapper<LoginResponse>>(url, { params: httpParams }).toPromise();
  }
}
