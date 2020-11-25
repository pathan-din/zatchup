import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiEcertificateDraftComponent } from './ei-ecertificate-draft.component';

describe('EiEcertificateDraftComponent', () => {
  let component: EiEcertificateDraftComponent;
  let fixture: ComponentFixture<EiEcertificateDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiEcertificateDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiEcertificateDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
