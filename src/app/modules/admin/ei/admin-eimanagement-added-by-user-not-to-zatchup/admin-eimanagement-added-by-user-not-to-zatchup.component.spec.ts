import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEIManagementAddedByUserNotToZatchupComponent } from './admin-eimanagement-added-by-user-not-to-zatchup.component';

describe('AdminEIManagementAddedByUserNotToZatchupComponent', () => {
  let component: AdminEIManagementAddedByUserNotToZatchupComponent;
  let fixture: ComponentFixture<AdminEIManagementAddedByUserNotToZatchupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEIManagementAddedByUserNotToZatchupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEIManagementAddedByUserNotToZatchupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
