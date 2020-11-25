import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubscriptionUpdateComponent } from './ei-subscription-update.component';

describe('EiSubscriptionUpdateComponent', () => {
  let component: EiSubscriptionUpdateComponent;
  let fixture: ComponentFixture<EiSubscriptionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubscriptionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubscriptionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
