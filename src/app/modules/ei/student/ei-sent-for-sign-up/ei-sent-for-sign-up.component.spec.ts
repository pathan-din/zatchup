import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSentForSignUpComponent } from './ei-sent-for-sign-up.component';

describe('EiSentForSignUpComponent', () => {
  let component: EiSentForSignUpComponent;
  let fixture: ComponentFixture<EiSentForSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiSentForSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSentForSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
