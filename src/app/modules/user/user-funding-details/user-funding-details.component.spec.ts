import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFundingDetailsComponent } from './user-funding-details.component';

describe('UserFundingDetailsComponent', () => {
  let component: UserFundingDetailsComponent;
  let fixture: ComponentFixture<UserFundingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFundingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFundingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
