import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFeesHistoryComponent } from './service-fees-history.component';

describe('ServiceFeesHistoryComponent', () => {
  let component: ServiceFeesHistoryComponent;
  let fixture: ComponentFixture<ServiceFeesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceFeesHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceFeesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
