import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCongratulationComponent } from './user-congratulation.component';

describe('UserCongratulationComponent', () => {
  let component: UserCongratulationComponent;
  let fixture: ComponentFixture<UserCongratulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCongratulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCongratulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
