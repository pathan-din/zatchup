import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarclassBuyHistoryComponent } from './starclass-buy-history.component';

describe('StarclassBuyHistoryComponent', () => {
  let component: StarclassBuyHistoryComponent;
  let fixture: ComponentFixture<StarclassBuyHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarclassBuyHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarclassBuyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
