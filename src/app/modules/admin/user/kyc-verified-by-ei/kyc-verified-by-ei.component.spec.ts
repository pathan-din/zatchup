import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycVerifiedByEiComponent } from './kyc-verified-by-ei.component';

describe('KycVerifiedByEiComponent', () => {
  let component: KycVerifiedByEiComponent;
  let fixture: ComponentFixture<KycVerifiedByEiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycVerifiedByEiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycVerifiedByEiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
