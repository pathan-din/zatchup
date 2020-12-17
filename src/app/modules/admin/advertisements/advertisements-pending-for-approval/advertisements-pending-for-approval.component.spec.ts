import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsPendingForApprovalComponent } from './advertisements-pending-for-approval.component';

describe('AdvertisementsPendingForApprovalComponent', () => {
  let component: AdvertisementsPendingForApprovalComponent;
  let fixture: ComponentFixture<AdvertisementsPendingForApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsPendingForApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsPendingForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
