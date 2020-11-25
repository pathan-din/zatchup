import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiInvoiceComponent } from './ei-invoice.component';

describe('EiInvoiceComponent', () => {
  let component: EiInvoiceComponent;
  let fixture: ComponentFixture<EiInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
