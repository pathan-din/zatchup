import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNewChatComponent } from './start-new-chat.component';

describe('StartNewChatComponent', () => {
  let component: StartNewChatComponent;
  let fixture: ComponentFixture<StartNewChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartNewChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartNewChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
