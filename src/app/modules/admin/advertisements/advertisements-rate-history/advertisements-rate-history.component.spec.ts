import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsRateHistoryComponent } from './advertisements-rate-history.component';

describe('AdvertisementsRateHistoryComponent', () => {
  let component: AdvertisementsRateHistoryComponent;
  let fixture: ComponentFixture<AdvertisementsRateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsRateHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsRateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
