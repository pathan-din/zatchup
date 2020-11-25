import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserStatusFilterComponent } from './admin-user-status-filter.component';

describe('AdminUserStatusFilterComponent', () => {
  let component: AdminUserStatusFilterComponent;
  let fixture: ComponentFixture<AdminUserStatusFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserStatusFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserStatusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
