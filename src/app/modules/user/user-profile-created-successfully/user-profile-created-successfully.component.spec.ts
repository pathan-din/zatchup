import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileCreatedSuccessfullyComponent } from './user-profile-created-successfully.component';

describe('UserProfileCreatedSuccessfullyComponent', () => {
  let component: UserProfileCreatedSuccessfullyComponent;
  let fixture: ComponentFixture<UserProfileCreatedSuccessfullyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileCreatedSuccessfullyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileCreatedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
