import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEiProfileComponent } from './user-ei-profile.component';

describe('UserEiProfileComponent', () => {
  let component: UserEiProfileComponent;
  let fixture: ComponentFixture<UserEiProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEiProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEiProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
