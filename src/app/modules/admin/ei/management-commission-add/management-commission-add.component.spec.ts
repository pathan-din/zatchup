import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCommissionAddComponent } from './management-commission-add.component';

describe('ManagementCommissionAddComponent', () => {
  let component: ManagementCommissionAddComponent;
  let fixture: ComponentFixture<ManagementCommissionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCommissionAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementCommissionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
