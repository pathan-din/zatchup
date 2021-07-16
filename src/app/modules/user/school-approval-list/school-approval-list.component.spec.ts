import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolApprovalListComponent } from './school-approval-list.component';

describe('SchoolApprovalListComponent', () => {
  let component: SchoolApprovalListComponent;
  let fixture: ComponentFixture<SchoolApprovalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolApprovalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
