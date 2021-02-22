import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeInsert } from 'src/app/models/employee-insert';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.sass']
})
export class EmployeeComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private matDialog: MatDialogRef<EmployeeComponent>) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      socialSecurityNumber: [null, [Validators.required]],
      phone: [null],
    })
  }
  async save() {
    if (this.formGroup.valid) {
      let employee = new EmployeeInsert(
        this.formGroup.get('firstName').value,
        this.formGroup.get('lastName').value,
        this.formGroup.get('socialSecurityNumber').value,
        this.formGroup.get('phone').value
      )
      let response = await this.employeeService.add(employee);
      Swal.fire('Information', response.message, 'success').finally(() => {
        this.matDialog.close(true);
      })
    }

  }
}
