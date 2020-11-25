import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateNewPasswordComponent } from './admin-create-new-password.component';

describe('AdminCreateNewPasswordComponent', () => {
  let component: AdminCreateNewPasswordComponent;
  let fixture: ComponentFixture<AdminCreateNewPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateNewPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
