import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiVerifiedAlumniComponent } from './ei-verified-alumni.component';

describe('EiVerifiedAlumniComponent', () => {
  let component: EiVerifiedAlumniComponent;
  let fixture: ComponentFixture<EiVerifiedAlumniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiVerifiedAlumniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiVerifiedAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
