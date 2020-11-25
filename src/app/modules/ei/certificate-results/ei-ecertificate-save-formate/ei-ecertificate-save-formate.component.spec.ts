import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiEcertificateSaveFormateComponent } from './ei-ecertificate-save-formate.component';

describe('EiEcertificateSaveFormateComponent', () => {
  let component: EiEcertificateSaveFormateComponent;
  let fixture: ComponentFixture<EiEcertificateSaveFormateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiEcertificateSaveFormateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiEcertificateSaveFormateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
