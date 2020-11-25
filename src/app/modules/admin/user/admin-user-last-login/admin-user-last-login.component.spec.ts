import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserLastLoginComponent } from './admin-user-last-login.component';

describe('AdminUserLastLoginComponent', () => {
  let component: AdminUserLastLoginComponent;
  let fixture: ComponentFixture<AdminUserLastLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserLastLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserLastLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
