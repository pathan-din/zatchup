import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedSubadminComponent } from './rejected-subadmin.component';

describe('RejectedSubadminComponent', () => {
  let component: RejectedSubadminComponent;
  let fixture: ComponentFixture<RejectedSubadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedSubadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedSubadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
