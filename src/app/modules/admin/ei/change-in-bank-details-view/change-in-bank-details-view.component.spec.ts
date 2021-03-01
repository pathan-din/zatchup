import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeInBankDetailsViewComponent } from './change-in-bank-details-view.component';

describe('ChangeInBankDetailsViewComponent', () => {
  let component: ChangeInBankDetailsViewComponent;
  let fixture: ComponentFixture<ChangeInBankDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeInBankDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeInBankDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
