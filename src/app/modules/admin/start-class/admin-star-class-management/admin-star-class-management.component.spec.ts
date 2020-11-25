import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStarClassManagementComponent } from './admin-star-class-management.component';

describe('AdminStarClassManagementComponent', () => {
  let component: AdminStarClassManagementComponent;
  let fixture: ComponentFixture<AdminStarClassManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStarClassManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStarClassManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
