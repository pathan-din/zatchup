import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarclassMultipleEiComponent } from './starclass-multiple-ei.component';

describe('StarclassMultipleEiComponent', () => {
  let component: StarclassMultipleEiComponent;
  let fixture: ComponentFixture<StarclassMultipleEiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarclassMultipleEiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarclassMultipleEiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
