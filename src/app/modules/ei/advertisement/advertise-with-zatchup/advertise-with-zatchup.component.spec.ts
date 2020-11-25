import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseWithZatchupComponent } from './advertise-with-zatchup.component';

describe('AdvertiseWithZatchupComponent', () => {
  let component: AdvertiseWithZatchupComponent;
  let fixture: ComponentFixture<AdvertiseWithZatchupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiseWithZatchupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseWithZatchupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
