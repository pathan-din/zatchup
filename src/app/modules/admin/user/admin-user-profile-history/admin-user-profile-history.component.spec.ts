import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserProfileHistoryComponent } from './admin-user-profile-history.component';

describe('AdminUserProfileHistoryComponent', () => {
  let component: AdminUserProfileHistoryComponent;
  let fixture: ComponentFixture<AdminUserProfileHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserProfileHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserProfileHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
