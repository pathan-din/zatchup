import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLectureRequestComponent } from './user-lecture-request.component';

describe('UserLectureRequestComponent', () => {
  let component: UserLectureRequestComponent;
  let fixture: ComponentFixture<UserLectureRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLectureRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLectureRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
