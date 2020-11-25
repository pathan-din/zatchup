import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarclassBoughtComponent } from './starclass-bought.component';

describe('StarclassBoughtComponent', () => {
  let component: StarclassBoughtComponent;
  let fixture: ComponentFixture<StarclassBoughtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarclassBoughtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarclassBoughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
