import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsActiveAudienceComponent } from './advertisements-active-audience.component';

describe('AdvertisementsActiveAudienceComponent', () => {
  let component: AdvertisementsActiveAudienceComponent;
  let fixture: ComponentFixture<AdvertisementsActiveAudienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsActiveAudienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsActiveAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
