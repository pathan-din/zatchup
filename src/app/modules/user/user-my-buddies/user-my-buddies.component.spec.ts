import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyBuddiesComponent } from './user-my-buddies.component';

describe('UserMyBuddiesComponent', () => {
  let component: UserMyBuddiesComponent;
  let fixture: ComponentFixture<UserMyBuddiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMyBuddiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMyBuddiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
