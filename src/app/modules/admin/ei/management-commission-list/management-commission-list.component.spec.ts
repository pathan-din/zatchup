import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCommissionListComponent } from './management-commission-list.component';

describe('ManagementCommissionListComponent', () => {
  let component: ManagementCommissionListComponent;
  let fixture: ComponentFixture<ManagementCommissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementCommissionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementCommissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
