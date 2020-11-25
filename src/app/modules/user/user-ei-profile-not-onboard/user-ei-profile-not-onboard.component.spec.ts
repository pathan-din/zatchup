import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEiProfileNotOnboardComponent } from './user-ei-profile-not-onboard.component';

describe('UserEiProfileNotOnboardComponent', () => {
  let component: UserEiProfileNotOnboardComponent;
  let fixture: ComponentFixture<UserEiProfileNotOnboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEiProfileNotOnboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEiProfileNotOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
