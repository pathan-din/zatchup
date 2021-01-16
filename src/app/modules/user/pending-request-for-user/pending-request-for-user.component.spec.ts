import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequestForUserComponent } from './pending-request-for-user.component';

describe('PendingRequestForUserComponent', () => {
  let component: PendingRequestForUserComponent;
  let fixture: ComponentFixture<PendingRequestForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingRequestForUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRequestForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
