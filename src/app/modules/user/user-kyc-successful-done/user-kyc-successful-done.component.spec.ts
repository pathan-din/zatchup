import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKycSuccessfulDoneComponent } from './user-kyc-successful-done.component';

describe('UserKycSuccessfulDoneComponent', () => {
  let component: UserKycSuccessfulDoneComponent;
  let fixture: ComponentFixture<UserKycSuccessfulDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserKycSuccessfulDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserKycSuccessfulDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
