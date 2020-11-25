import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationAndBankComponent } from './information-and-bank.component';

describe('InformationAndBankComponent', () => {
  let component: InformationAndBankComponent;
  let fixture: ComponentFixture<InformationAndBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationAndBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationAndBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
