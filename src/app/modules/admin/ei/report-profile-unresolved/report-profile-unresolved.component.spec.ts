import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProfileUnresolvedComponent } from './report-profile-unresolved.component';

describe('ReportProfileUnresolvedComponent', () => {
  let component: ReportProfileUnresolvedComponent;
  let fixture: ComponentFixture<ReportProfileUnresolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportProfileUnresolvedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProfileUnresolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
