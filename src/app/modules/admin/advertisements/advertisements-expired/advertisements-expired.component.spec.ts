import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsExpiredComponent } from './advertisements-expired.component';

describe('AdvertisementsExpiredComponent', () => {
  let component: AdvertisementsExpiredComponent;
  let fixture: ComponentFixture<AdvertisementsExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsExpiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
