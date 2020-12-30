import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonalInformationComponent } from './user-personal-information.component';

describe('UserPersonalInformationComponent', () => {
  let component: UserPersonalInformationComponent;
  let fixture: ComponentFixture<UserPersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPersonalInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
