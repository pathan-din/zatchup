import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserReportHistoryComponent } from './admin-user-report-history.component';

describe('AdminUserReportHistoryComponent', () => {
  let component: AdminUserReportHistoryComponent;
  let fixture: ComponentFixture<AdminUserReportHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserReportHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserReportHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
