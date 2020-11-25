import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassComponent } from './ei-starclass.component';

describe('EiStarclassComponent', () => {
  let component: EiStarclassComponent;
  let fixture: ComponentFixture<EiStarclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
