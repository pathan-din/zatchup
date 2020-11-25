import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetailRequestsPendingComponent } from './change-detail-requests-pending.component';

describe('ChangeDetailRequestsPendingComponent', () => {
  let component: ChangeDetailRequestsPendingComponent;
  let fixture: ComponentFixture<ChangeDetailRequestsPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDetailRequestsPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDetailRequestsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
