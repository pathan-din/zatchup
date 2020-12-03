import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsRejectComponent } from './advertisements-reject.component';

describe('AdvertisementsRejectComponent', () => {
  let component: AdvertisementsRejectComponent;
  let fixture: ComponentFixture<AdvertisementsRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
