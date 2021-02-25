import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTermsConditionsComponent } from './common-terms-conditions.component';

describe('CommonTermsConditionsComponent', () => {
  let component: CommonTermsConditionsComponent;
  let fixture: ComponentFixture<CommonTermsConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonTermsConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonTermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
