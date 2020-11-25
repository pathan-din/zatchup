import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEiManagementFeesSubscriptionComponent } from './admin-ei-management-fees-subscription.component';

describe('AdminEiManagementFeesSubscriptionComponent', () => {
  let component: AdminEiManagementFeesSubscriptionComponent;
  let fixture: ComponentFixture<AdminEiManagementFeesSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEiManagementFeesSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEiManagementFeesSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
