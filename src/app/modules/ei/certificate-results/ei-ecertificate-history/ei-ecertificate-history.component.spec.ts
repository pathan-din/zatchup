import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiEcertificateHistoryComponent } from './ei-ecertificate-history.component';

describe('EiEcertificateHistoryComponent', () => {
  let component: EiEcertificateHistoryComponent;
  let fixture: ComponentFixture<EiEcertificateHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiEcertificateHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiEcertificateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
