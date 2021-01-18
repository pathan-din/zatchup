import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingChangeRequestsComponent } from './admin-pending-change-requests.component';

describe('AdminPendingChangeRequestsComponent', () => {
  let component: AdminPendingChangeRequestsComponent;
  let fixture: ComponentFixture<AdminPendingChangeRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPendingChangeRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPendingChangeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
