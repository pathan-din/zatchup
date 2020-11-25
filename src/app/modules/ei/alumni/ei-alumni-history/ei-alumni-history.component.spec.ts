import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiAlumniHistoryComponent } from './ei-alumni-history.component';

describe('EiAlumniHistoryComponent', () => {
  let component: EiAlumniHistoryComponent;
  let fixture: ComponentFixture<EiAlumniHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiAlumniHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiAlumniHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
