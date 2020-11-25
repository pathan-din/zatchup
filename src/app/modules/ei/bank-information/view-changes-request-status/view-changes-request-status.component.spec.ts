import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChangesRequestStatusComponent } from './view-changes-request-status.component';

describe('ViewChangesRequestStatusComponent', () => {
  let component: ViewChangesRequestStatusComponent;
  let fixture: ComponentFixture<ViewChangesRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewChangesRequestStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChangesRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
