import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEiRejectDetailsViewComponent } from './admin-ei-reject-details-view.component';

describe('AdminEiRejectDetailsViewComponent', () => {
  let component: AdminEiRejectDetailsViewComponent;
  let fixture: ComponentFixture<AdminEiRejectDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEiRejectDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEiRejectDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
