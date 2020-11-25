import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEiConfirmationComponent } from './user-ei-confirmation.component';

describe('UserEiConfirmationComponent', () => {
  let component: UserEiConfirmationComponent;
  let fixture: ComponentFixture<UserEiConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEiConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEiConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
