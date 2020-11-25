import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubadminStatusListComponent } from './ei-subadmin-status-list.component';

describe('EiSubadminStatusListComponent', () => {
  let component: EiSubadminStatusListComponent;
  let fixture: ComponentFixture<EiSubadminStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubadminStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubadminStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
