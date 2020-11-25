import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiEcertificateCreateFormatComponent } from './ei-ecertificate-create-format.component';

describe('EiEcertificateCreateFormatComponent', () => {
  let component: EiEcertificateCreateFormatComponent;
  let fixture: ComponentFixture<EiEcertificateCreateFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiEcertificateCreateFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiEcertificateCreateFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
