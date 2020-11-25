import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKycHistoryOrViewComponent } from './admin-kyc-history-or-view.component';

describe('AdminKycHistoryOrViewComponent', () => {
  let component: AdminKycHistoryOrViewComponent;
  let fixture: ComponentFixture<AdminKycHistoryOrViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKycHistoryOrViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKycHistoryOrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
