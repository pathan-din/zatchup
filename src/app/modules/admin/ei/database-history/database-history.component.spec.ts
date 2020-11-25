import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseHistoryComponent } from './database-history.component';

describe('DatabaseHistoryComponent', () => {
  let component: DatabaseHistoryComponent;
  let fixture: ComponentFixture<DatabaseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
