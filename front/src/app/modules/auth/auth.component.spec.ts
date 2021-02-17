import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AuthComponent } from './auth.component';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'src/app/services/user.service';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';


describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let loader: HarnessLoader;
  // let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    // router = TestBed.get(Router);
    // router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should detect invalid form on submit', async () => {
    component.formGroup.get('userName').setValue('wrong_email');
    component.formGroup.get('password').setValue(null);
    const button = await loader.getHarness(MatButtonHarness);
    button.click();
    fixture.detectChanges();
    fixture.whenStable().then(async () => {
      expect(!component.formGroup.valid).toBeTruthy();
    })
  });
  it('should detect valid form on submit', async () => {
    component.formGroup.get('userName').setValue('good_email@gmail.com');
    component.formGroup.get('password').setValue('asdasdTER213');
    const button = await loader.getHarness(MatButtonHarness);
    button.click();
    fixture.detectChanges();
    fixture.whenStable().then(async () => {
      expect(component.formGroup.valid).toBeTruthy();
    })
  });
});

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const userServiceSpy = jasmine.createSpyObj('UserService', ['getAccess']);
const validUser = { userName: 'admin@gmail.com', password: '123456' }
const invalidUser = { userName: 'sadeweqwe@gmail.com', password: '123456asd' }

describe('AuthComponent integrated successful test', () => {
  let fixture: ComponentFixture<AuthComponent>;
  let getAccessSpy;
  function fillForm(userName: string, password: string) {
    fixture.componentInstance.formGroup.get('userName').setValue(userName);
    fixture.componentInstance.formGroup.get('password').setValue(password);
  }

  beforeEach(async(() => {
    const response = { data: { token: '' }, message: '' }
    getAccessSpy = userServiceSpy.getAccess.and.returnValue(Promise.resolve(response));
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [AuthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    fixture.detectChanges();


  }));

  it('userService.getAccess should called ', fakeAsync(() => {
    fillForm(validUser.userName, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(getAccessSpy.calls.any()).toBe(true, 'getAccess called');
  }));

  it('should route to home if login successfully', fakeAsync(() => {
    fillForm(validUser.userName, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/main']);
  }));
});

describe('AuthComponent integrated failed test', () => {
  let fixture: ComponentFixture<AuthComponent>;
  function fillForm(userName: string, password: string) {
    fixture.componentInstance.formGroup.get('userName').setValue(userName);
    fixture.componentInstance.formGroup.get('password').setValue(password);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [AuthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    fixture.detectChanges();


  }));
  it('should not navigate to home if login fails', fakeAsync(() => {
    userServiceSpy.getAccess.and.callFake(() => Promise.reject(new Error('Unauthorized')).catch(error => {
      expect(routerSpy.navigate).not.toHaveBeenCalled();
    }))
    fillForm(invalidUser.userName, invalidUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
  }));
});