import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassCartComponent } from './ei-starclass-cart.component';

describe('EiStarclassCartComponent', () => {
  let component: EiStarclassCartComponent;
  let fixture: ComponentFixture<EiStarclassCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
