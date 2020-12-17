import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsActiveViewComponent } from './advertisements-active-view.component';

describe('AdvertisementsActiveViewComponent', () => {
  let component: AdvertisementsActiveViewComponent;
  let fixture: ComponentFixture<AdvertisementsActiveViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsActiveViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsActiveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
