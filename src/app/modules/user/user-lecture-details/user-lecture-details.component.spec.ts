import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLectureDetailsComponent } from './user-lecture-details.component';

describe('UserLectureDetailsComponent', () => {
  let component: UserLectureDetailsComponent;
  let fixture: ComponentFixture<UserLectureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLectureDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLectureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
