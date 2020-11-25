import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardedViewComponent } from './onboarded-view.component';

describe('OnboardedViewComponent', () => {
  let component: OnboardedViewComponent;
  let fixture: ComponentFixture<OnboardedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
