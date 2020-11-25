import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEiRejectDetailsComponent } from './admin-ei-reject-details.component';

describe('AdminEiRejectDetailsComponent', () => {
  let component: AdminEiRejectDetailsComponent;
  let fixture: ComponentFixture<AdminEiRejectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEiRejectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEiRejectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
