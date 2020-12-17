import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsConfigureRateComponent } from './advertisements-configure-rate.component';

describe('AdvertisementsConfigureRateComponent', () => {
  let component: AdvertisementsConfigureRateComponent;
  let fixture: ComponentFixture<AdvertisementsConfigureRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsConfigureRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsConfigureRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
