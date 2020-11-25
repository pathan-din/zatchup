import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProjectResolvedComponent } from './report-project-resolved.component';

describe('ReportProjectResolvedComponent', () => {
  let component: ReportProjectResolvedComponent;
  let fixture: ComponentFixture<ReportProjectResolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportProjectResolvedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProjectResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
