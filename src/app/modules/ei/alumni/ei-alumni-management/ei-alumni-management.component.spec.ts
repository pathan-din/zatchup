import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiAlumniManagementComponent } from './ei-alumni-management.component';

describe('EiAlumniManagementComponent', () => {
  let component: EiAlumniManagementComponent;
  let fixture: ComponentFixture<EiAlumniManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiAlumniManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiAlumniManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
