import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCertificateComponent } from './user-certificate.component';

describe('UserCertificateComponent', () => {
  let component: UserCertificateComponent;
  let fixture: ComponentFixture<UserCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
