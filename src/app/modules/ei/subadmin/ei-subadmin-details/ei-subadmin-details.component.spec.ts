import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubadminDetailsComponent } from './ei-subadmin-details.component';

describe('EiSubadminDetailsComponent', () => {
  let component: EiSubadminDetailsComponent;
  let fixture: ComponentFixture<EiSubadminDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubadminDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubadminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
