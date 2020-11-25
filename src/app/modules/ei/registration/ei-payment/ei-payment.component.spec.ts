import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiPaymentComponent } from './ei-payment.component';

describe('EiPaymentComponent', () => {
  let component: EiPaymentComponent;
  let fixture: ComponentFixture<EiPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
