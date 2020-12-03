import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsPendingForApprovalViewComponent } from './advertisements-pending-for-approval-view.component';

describe('AdvertisementsPendingForApprovalViewComponent', () => {
  let component: AdvertisementsPendingForApprovalViewComponent;
  let fixture: ComponentFixture<AdvertisementsPendingForApprovalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsPendingForApprovalViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsPendingForApprovalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
