import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminPendingRequestComponent } from './subadmin-pending-request.component';

describe('SubadminPendingRequestComponent', () => {
  let component: SubadminPendingRequestComponent;
  let fixture: ComponentFixture<SubadminPendingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminPendingRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminPendingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
