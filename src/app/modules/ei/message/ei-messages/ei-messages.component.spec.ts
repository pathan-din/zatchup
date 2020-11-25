import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiMessagesComponent } from './ei-messages.component';

describe('EiMessagesComponent', () => {
  let component: EiMessagesComponent;
  let fixture: ComponentFixture<EiMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
