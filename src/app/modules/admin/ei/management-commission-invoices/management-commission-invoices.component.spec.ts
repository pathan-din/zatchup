import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCommissionInvoicesComponent } from './management-commission-invoices.component';

describe('ManagementCommissionInvoicesComponent', () => {
  let component: ManagementCommissionInvoicesComponent;
  let fixture: ComponentFixture<ManagementCommissionInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCommissionInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementCommissionInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
