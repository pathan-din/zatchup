import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKycCompleteComponent } from './admin-kyc-complete.component';

describe('AdminKycCompleteComponent', () => {
  let component: AdminKycCompleteComponent;
  let fixture: ComponentFixture<AdminKycCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKycCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKycCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
