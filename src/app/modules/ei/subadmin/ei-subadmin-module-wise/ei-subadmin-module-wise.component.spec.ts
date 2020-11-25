import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubadminModuleWiseComponent } from './ei-subadmin-module-wise.component';

describe('EiSubadminModuleWiseComponent', () => {
  let component: EiSubadminModuleWiseComponent;
  let fixture: ComponentFixture<EiSubadminModuleWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubadminModuleWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubadminModuleWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
