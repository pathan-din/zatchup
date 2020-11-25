import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubadminModuleAccessHistoryComponent } from './ei-subadmin-module-access-history.component';

describe('EiSubadminModuleAccessHistoryComponent', () => {
  let component: EiSubadminModuleAccessHistoryComponent;
  let fixture: ComponentFixture<EiSubadminModuleAccessHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubadminModuleAccessHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubadminModuleAccessHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
