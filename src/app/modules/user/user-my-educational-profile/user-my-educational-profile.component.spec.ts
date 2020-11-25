import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyEducationalProfileComponent } from './user-my-educational-profile.component';

describe('UserMyEducationalProfileComponent', () => {
  let component: UserMyEducationalProfileComponent;
  let fixture: ComponentFixture<UserMyEducationalProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMyEducationalProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMyEducationalProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
