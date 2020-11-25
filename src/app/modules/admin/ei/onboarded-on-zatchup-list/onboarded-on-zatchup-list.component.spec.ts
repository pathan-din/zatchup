import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardedOnZatchupListComponent } from './onboarded-on-zatchup-list.component';

describe('OnboardedOnZatchupListComponent', () => {
  let component: OnboardedOnZatchupListComponent;
  let fixture: ComponentFixture<OnboardedOnZatchupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardedOnZatchupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardedOnZatchupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
