import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundClosedComponent } from './fund-closed.component';

describe('FundClosedComponent', () => {
  let component: FundClosedComponent;
  let fixture: ComponentFixture<FundClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundClosedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
