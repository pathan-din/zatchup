import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiEcertificateComponent } from './ei-ecertificate.component';

describe('EiEcertificateComponent', () => {
  let component: EiEcertificateComponent;
  let fixture: ComponentFixture<EiEcertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiEcertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiEcertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
