import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassPaymentComponent } from './ei-starclass-payment.component';

describe('EiStarclassPaymentComponent', () => {
  let component: EiStarclassPaymentComponent;
  let fixture: ComponentFixture<EiStarclassPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
