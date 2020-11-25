import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionFeesReceivedComponent } from './subscription-fees-received.component';

describe('SubscriptionFeesReceivedComponent', () => {
  let component: SubscriptionFeesReceivedComponent;
  let fixture: ComponentFixture<SubscriptionFeesReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionFeesReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionFeesReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
