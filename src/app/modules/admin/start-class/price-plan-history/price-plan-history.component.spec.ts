import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePlanHistoryComponent } from './price-plan-history.component';

describe('PricePlanHistoryComponent', () => {
  let component: PricePlanHistoryComponent;
  let fixture: ComponentFixture<PricePlanHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricePlanHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricePlanHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
