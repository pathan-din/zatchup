import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProfileResolvedComponent } from './report-profile-resolved.component';

describe('ReportProfileResolvedComponent', () => {
  let component: ReportProfileResolvedComponent;
  let fixture: ComponentFixture<ReportProfileResolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportProfileResolvedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProfileResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
