import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubadminManagementComponent } from './ei-subadmin-management.component';

describe('EiSubadminManagementComponent', () => {
  let component: EiSubadminManagementComponent;
  let fixture: ComponentFixture<EiSubadminManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubadminManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubadminManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
