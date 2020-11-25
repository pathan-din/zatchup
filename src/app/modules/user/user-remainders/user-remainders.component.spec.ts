import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRemaindersComponent } from './user-remainders.component';

describe('UserRemaindersComponent', () => {
  let component: UserRemaindersComponent;
  let fixture: ComponentFixture<UserRemaindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRemaindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRemaindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
