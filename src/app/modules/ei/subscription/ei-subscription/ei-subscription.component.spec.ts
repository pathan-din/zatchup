import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubscriptionComponent } from './ei-subscription.component';

describe('EiSubscriptionComponent', () => {
  let component: EiSubscriptionComponent;
  let fixture: ComponentFixture<EiSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
