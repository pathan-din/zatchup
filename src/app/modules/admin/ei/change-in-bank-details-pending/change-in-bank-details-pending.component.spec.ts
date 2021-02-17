import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeInBankDetailsPendingComponent } from './change-in-bank-details-pending.component';

describe('ChangeInBankDetailsPendingComponent', () => {
  let component: ChangeInBankDetailsPendingComponent;
  let fixture: ComponentFixture<ChangeInBankDetailsPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeInBankDetailsPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeInBankDetailsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
