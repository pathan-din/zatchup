import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarclassBoughtViewComponent } from './starclass-bought-view.component';

describe('StarclassBoughtViewComponent', () => {
  let component: StarclassBoughtViewComponent;
  let fixture: ComponentFixture<StarclassBoughtViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarclassBoughtViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarclassBoughtViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
