import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkDetailComponent } from './user-work-detail.component';

describe('UserWorkDetailComponent', () => {
  let component: UserWorkDetailComponent;
  let fixture: ComponentFixture<UserWorkDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWorkDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
