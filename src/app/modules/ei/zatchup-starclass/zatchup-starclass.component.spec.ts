import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZatchupStarclassComponent } from './zatchup-starclass.component';

describe('ZatchupStarclassComponent', () => {
  let component: ZatchupStarclassComponent;
  let fixture: ComponentFixture<ZatchupStarclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZatchupStarclassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZatchupStarclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
