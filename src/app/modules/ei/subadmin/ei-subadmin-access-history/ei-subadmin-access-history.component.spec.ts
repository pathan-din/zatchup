import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubadminAccessHistoryComponent } from './ei-subadmin-access-history.component';

describe('EiSubadminAccessHistoryComponent', () => {
  let component: EiSubadminAccessHistoryComponent;
  let fixture: ComponentFixture<EiSubadminAccessHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubadminAccessHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubadminAccessHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
