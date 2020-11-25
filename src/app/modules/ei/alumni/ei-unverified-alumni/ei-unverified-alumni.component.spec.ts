import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiUnverifiedAlumniComponent } from './ei-unverified-alumni.component';

describe('EiUnverifiedAlumniComponent', () => {
  let component: EiUnverifiedAlumniComponent;
  let fixture: ComponentFixture<EiUnverifiedAlumniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiUnverifiedAlumniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiUnverifiedAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
