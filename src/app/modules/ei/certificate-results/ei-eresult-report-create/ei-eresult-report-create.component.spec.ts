import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiEresultReportCreateComponent } from './ei-eresult-report-create.component';

describe('EiEresultReportCreateComponent', () => {
  let component: EiEresultReportCreateComponent;
  let fixture: ComponentFixture<EiEresultReportCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiEresultReportCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiEresultReportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
