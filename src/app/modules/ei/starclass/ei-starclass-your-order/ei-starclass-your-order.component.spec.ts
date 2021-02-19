import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassYourOrderComponent } from './ei-starclass-your-order.component';

describe('EiStarclassYourOrderComponent', () => {
  let component: EiStarclassYourOrderComponent;
  let fixture: ComponentFixture<EiStarclassYourOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiStarclassYourOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassYourOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
