import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundActiveComponent } from './fund-active.component';

describe('FundActiveComponent', () => {
  let component: FundActiveComponent;
  let fixture: ComponentFixture<FundActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
