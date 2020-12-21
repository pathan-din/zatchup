import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchooReminderComponent } from './schoo-reminder.component';

describe('SchooReminderComponent', () => {
  let component: SchooReminderComponent;
  let fixture: ComponentFixture<SchooReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchooReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchooReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
