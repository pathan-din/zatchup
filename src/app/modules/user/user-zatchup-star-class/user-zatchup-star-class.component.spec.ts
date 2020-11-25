import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserZatchupStarClassComponent } from './user-zatchup-star-class.component';

describe('UserZatchupStarClassComponent', () => {
  let component: UserZatchupStarClassComponent;
  let fixture: ComponentFixture<UserZatchupStarClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserZatchupStarClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserZatchupStarClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
