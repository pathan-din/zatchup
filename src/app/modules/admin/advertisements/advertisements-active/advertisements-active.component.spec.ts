import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsActiveComponent } from './advertisements-active.component';

describe('AdvertisementsActiveComponent', () => {
  let component: AdvertisementsActiveComponent;
  let fixture: ComponentFixture<AdvertisementsActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
