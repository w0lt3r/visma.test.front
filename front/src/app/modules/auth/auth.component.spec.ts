import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AuthComponent } from './auth.component';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let loader: HarnessLoader;
  // let location: Location;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule]
    })
      .compileComponents();
    // fixture = TestBed.createComponent(AuthComponent);
    // loader = TestbedHarnessEnvironment.loader(fixture);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    router = TestBed.get(Router);
    router.initialNavigation();
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
