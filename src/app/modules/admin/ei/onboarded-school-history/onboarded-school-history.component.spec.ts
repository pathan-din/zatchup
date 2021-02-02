import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardedSchoolHistoryComponent } from './onboarded-school-history.component';

describe('OnboardedSchoolHistoryComponent', () => {
  let component: OnboardedSchoolHistoryComponent;
  let fixture: ComponentFixture<OnboardedSchoolHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardedSchoolHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardedSchoolHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
