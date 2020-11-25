import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSchoolConfirmationComponent } from './user-school-confirmation.component';

describe('UserSchoolConfirmationComponent', () => {
  let component: UserSchoolConfirmationComponent;
  let fixture: ComponentFixture<UserSchoolConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSchoolConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSchoolConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
