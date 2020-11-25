import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssignedEiHistoryComponent } from './my-assigned-ei-history.component';

describe('MyAssignedEiHistoryComponent', () => {
  let component: MyAssignedEiHistoryComponent;
  let fixture: ComponentFixture<MyAssignedEiHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAssignedEiHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAssignedEiHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
