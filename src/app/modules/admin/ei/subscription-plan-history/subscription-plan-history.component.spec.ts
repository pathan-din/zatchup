import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPlanHistoryComponent } from './subscription-plan-history.component';

describe('SubscriptionPlanHistoryComponent', () => {
  let component: SubscriptionPlanHistoryComponent;
  let fixture: ComponentFixture<SubscriptionPlanHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionPlanHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPlanHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
