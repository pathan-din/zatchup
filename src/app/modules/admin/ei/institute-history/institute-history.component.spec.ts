import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteHistoryComponent } from './institute-history.component';

describe('InstituteHistoryComponent', () => {
  let component: InstituteHistoryComponent;
  let fixture: ComponentFixture<InstituteHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
