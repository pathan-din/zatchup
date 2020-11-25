import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminPendingAccessComponent } from './subadmin-pending-access.component';

describe('SubadminPendingAccessComponent', () => {
  let component: SubadminPendingAccessComponent;
  let fixture: ComponentFixture<SubadminPendingAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminPendingAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminPendingAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
