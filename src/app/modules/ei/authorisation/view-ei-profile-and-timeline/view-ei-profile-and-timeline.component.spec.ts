import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEiProfileAndTimelineComponent } from './view-ei-profile-and-timeline.component';

describe('ViewEiProfileAndTimelineComponent', () => {
  let component: ViewEiProfileAndTimelineComponent;
  let fixture: ComponentFixture<ViewEiProfileAndTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEiProfileAndTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEiProfileAndTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
