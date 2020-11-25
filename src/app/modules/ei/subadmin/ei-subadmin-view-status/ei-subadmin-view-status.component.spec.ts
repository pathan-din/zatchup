import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubadminViewStatusComponent } from './ei-subadmin-view-status.component';

describe('EiSubadminViewStatusComponent', () => {
  let component: EiSubadminViewStatusComponent;
  let fixture: ComponentFixture<EiSubadminViewStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubadminViewStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubadminViewStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
