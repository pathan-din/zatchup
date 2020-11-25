import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiChequeDetailsComponent } from './ei-cheque-details.component';

describe('EiChequeDetailsComponent', () => {
  let component: EiChequeDetailsComponent;
  let fixture: ComponentFixture<EiChequeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiChequeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiChequeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
