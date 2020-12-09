import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPendingListComponent } from './sign-up-pending-list.component';

describe('SignUpPendingListComponent', () => {
  let component: SignUpPendingListComponent;
  let fixture: ComponentFixture<SignUpPendingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpPendingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
