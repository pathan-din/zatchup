import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectFundingComponent } from './user-project-funding.component';

describe('UserProjectFundingComponent', () => {
  let component: UserProjectFundingComponent;
  let fixture: ComponentFixture<UserProjectFundingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProjectFundingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
