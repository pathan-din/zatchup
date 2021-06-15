import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiPlayHistoryComponent } from './ei-play-history.component';

describe('EiPlayHistoryComponent', () => {
  let component: EiPlayHistoryComponent;
  let fixture: ComponentFixture<EiPlayHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiPlayHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiPlayHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
