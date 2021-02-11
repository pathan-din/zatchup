import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniSummaryComponent } from './alumni-summary.component';

describe('AlumniSummaryComponent', () => {
  let component: AlumniSummaryComponent;
  let fixture: ComponentFixture<AlumniSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumniSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumniSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
