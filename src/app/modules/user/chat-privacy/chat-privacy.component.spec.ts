import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPrivacyComponent } from './chat-privacy.component';

describe('ChatPrivacyComponent', () => {
  let component: ChatPrivacyComponent;
  let fixture: ComponentFixture<ChatPrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPrivacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
