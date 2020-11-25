import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiCourierDetailsComponent } from './ei-courier-details.component';

describe('EiCourierDetailsComponent', () => {
  let component: EiCourierDetailsComponent;
  let fixture: ComponentFixture<EiCourierDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiCourierDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiCourierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
