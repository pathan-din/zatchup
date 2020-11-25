import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKycConfigureComponent } from './admin-kyc-configure.component';

describe('AdminKycConfigureComponent', () => {
  let component: AdminKycConfigureComponent;
  let fixture: ComponentFixture<AdminKycConfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKycConfigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKycConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
