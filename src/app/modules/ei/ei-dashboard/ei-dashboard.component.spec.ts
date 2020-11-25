import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiDashboardComponent } from './ei-dashboard.component';

describe('EiDashboardComponent', () => {
  let component: EiDashboardComponent;
  let fixture: ComponentFixture<EiDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
