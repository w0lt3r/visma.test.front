import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }
  async login() {
    if (this.formGroup.valid) {
      let response = await this.userService.getAccess(this.formGroup.get('userName').value, this.formGroup.get('password').value);
      localStorage.setItem('token', response.data.token)
      this.router.navigate(['/main'])
    }
  }
}
