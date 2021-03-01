import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminTermsAndConditionsComponent } from './subadmin-terms-and-conditions.component';

describe('SubadminTermsAndConditionsComponent', () => {
  let component: SubadminTermsAndConditionsComponent;
  let fixture: ComponentFixture<SubadminTermsAndConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminTermsAndConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminTermsAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
