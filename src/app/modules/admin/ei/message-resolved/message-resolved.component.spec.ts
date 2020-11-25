import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageResolvedComponent } from './message-resolved.component';

describe('MessageResolvedComponent', () => {
  let component: MessageResolvedComponent;
  let fixture: ComponentFixture<MessageResolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageResolvedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
