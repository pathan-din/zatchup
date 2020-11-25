import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreatePostComponent } from './user-create-post.component';

describe('UserCreatePostComponent', () => {
  let component: UserCreatePostComponent;
  let fixture: ComponentFixture<UserCreatePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreatePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
