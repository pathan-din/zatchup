import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderPastComponent } from './reminder-past.component';

describe('ReminderPastComponent', () => {
  let component: ReminderPastComponent;
  let fixture: ComponentFixture<ReminderPastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderPastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderPastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
