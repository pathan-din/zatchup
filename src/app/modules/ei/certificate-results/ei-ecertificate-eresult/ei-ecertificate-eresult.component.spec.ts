import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiEcertificateEresultComponent } from './ei-ecertificate-eresult.component';

describe('EiEcertificateEresultComponent', () => {
  let component: EiEcertificateEresultComponent;
  let fixture: ComponentFixture<EiEcertificateEresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiEcertificateEresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiEcertificateEresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
