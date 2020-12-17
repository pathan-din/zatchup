import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycVerifiedUsersComponent } from './kyc-verified-users.component';

describe('KycVerifiedUsersComponent', () => {
  let component: KycVerifiedUsersComponent;
  let fixture: ComponentFixture<KycVerifiedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycVerifiedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycVerifiedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
