import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsAddComponent } from './advertisements-add.component';

describe('AdvertisementsAddComponent', () => {
  let component: AdvertisementsAddComponent;
  let fixture: ComponentFixture<AdvertisementsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
