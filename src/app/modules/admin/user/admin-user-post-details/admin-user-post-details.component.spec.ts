import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserPostDetailsComponent } from './admin-user-post-details.component';

describe('AdminUserPostDetailsComponent', () => {
  let component: AdminUserPostDetailsComponent;
  let fixture: ComponentFixture<AdminUserPostDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserPostDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
