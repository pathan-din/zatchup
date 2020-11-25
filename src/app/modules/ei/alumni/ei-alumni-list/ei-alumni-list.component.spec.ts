import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiAlumniListComponent } from './ei-alumni-list.component';

describe('EiAlumniListComponent', () => {
  let component: EiAlumniListComponent;
  let fixture: ComponentFixture<EiAlumniListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiAlumniListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiAlumniListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
