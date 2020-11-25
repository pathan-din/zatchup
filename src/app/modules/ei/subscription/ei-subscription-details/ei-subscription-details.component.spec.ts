import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubscriptionDetailsComponent } from './ei-subscription-details.component';

describe('EiSubscriptionDetailsComponent', () => {
  let component: EiSubscriptionDetailsComponent;
  let fixture: ComponentFixture<EiSubscriptionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubscriptionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubscriptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
