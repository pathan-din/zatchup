import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiNotificationComponent } from './ei-notification.component';

describe('EiNotificationComponent', () => {
  let component: EiNotificationComponent;
  let fixture: ComponentFixture<EiNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
