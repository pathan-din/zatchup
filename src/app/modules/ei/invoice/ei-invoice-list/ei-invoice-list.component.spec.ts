import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiInvoiceListComponent } from './ei-invoice-list.component';

describe('EiInvoiceListComponent', () => {
  let component: EiInvoiceListComponent;
  let fixture: ComponentFixture<EiInvoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiInvoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
