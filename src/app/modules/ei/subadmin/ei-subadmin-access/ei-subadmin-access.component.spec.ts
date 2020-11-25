import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubadminAccessComponent } from './ei-subadmin-access.component';

describe('EiSubadminAccessComponent', () => {
  let component: EiSubadminAccessComponent;
  let fixture: ComponentFixture<EiSubadminAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubadminAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubadminAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
