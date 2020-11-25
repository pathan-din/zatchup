import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingConversationCommentsComponent } from './onboarding-conversation-comments.component';

describe('OnboardingConversationCommentsComponent', () => {
  let component: OnboardingConversationCommentsComponent;
  let fixture: ComponentFixture<OnboardingConversationCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingConversationCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingConversationCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
