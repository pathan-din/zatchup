import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCommissionHistoryComponent } from './management-commission-history.component';

describe('ManagementCommissionHistoryComponent', () => {
  let component: ManagementCommissionHistoryComponent;
  let fixture: ComponentFixture<ManagementCommissionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCommissionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementCommissionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
