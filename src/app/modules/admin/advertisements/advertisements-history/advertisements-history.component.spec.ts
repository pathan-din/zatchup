import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsHistoryComponent } from './advertisements-history.component';

describe('AdvertisementsHistoryComponent', () => {
  let component: AdvertisementsHistoryComponent;
  let fixture: ComponentFixture<AdvertisementsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
