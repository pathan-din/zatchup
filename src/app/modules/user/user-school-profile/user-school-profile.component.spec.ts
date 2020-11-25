import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSchoolProfileComponent } from './user-school-profile.component';

describe('UserSchoolProfileComponent', () => {
  let component: UserSchoolProfileComponent;
  let fixture: ComponentFixture<UserSchoolProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSchoolProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSchoolProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
