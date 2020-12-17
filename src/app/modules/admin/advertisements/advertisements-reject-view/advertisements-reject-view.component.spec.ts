import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsRejectViewComponent } from './advertisements-reject-view.component';

describe('AdvertisementsRejectViewComponent', () => {
  let component: AdvertisementsRejectViewComponent;
  let fixture: ComponentFixture<AdvertisementsRejectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsRejectViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsRejectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
