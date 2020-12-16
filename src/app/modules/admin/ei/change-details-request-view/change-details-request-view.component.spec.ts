import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetailsRequestViewComponent } from './change-details-request-view.component';

describe('ChangeDetailsRequestViewComponent', () => {
  let component: ChangeDetailsRequestViewComponent;
  let fixture: ComponentFixture<ChangeDetailsRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDetailsRequestViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDetailsRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
