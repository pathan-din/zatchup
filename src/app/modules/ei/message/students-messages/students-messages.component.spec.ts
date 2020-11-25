import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsMessagesComponent } from './students-messages.component';

describe('StudentsMessagesComponent', () => {
  let component: StudentsMessagesComponent;
  let fixture: ComponentFixture<StudentsMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
