import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMySchoolTabComponent } from './user-my-school-tab.component';

describe('UserMySchoolTabComponent', () => {
  let component: UserMySchoolTabComponent;
  let fixture: ComponentFixture<UserMySchoolTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMySchoolTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMySchoolTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
