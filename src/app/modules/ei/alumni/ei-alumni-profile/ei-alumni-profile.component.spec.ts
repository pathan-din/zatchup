import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiAlumniProfileComponent } from './ei-alumni-profile.component';

describe('EiAlumniProfileComponent', () => {
  let component: EiAlumniProfileComponent;
  let fixture: ComponentFixture<EiAlumniProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiAlumniProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiAlumniProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
