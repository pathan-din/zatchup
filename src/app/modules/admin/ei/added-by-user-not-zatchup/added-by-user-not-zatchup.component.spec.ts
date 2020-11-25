import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedByUserNotZatchupComponent } from './added-by-user-not-zatchup.component';

describe('AddedByUserNotZatchupComponent', () => {
  let component: AddedByUserNotZatchupComponent;
  let fixture: ComponentFixture<AddedByUserNotZatchupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedByUserNotZatchupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedByUserNotZatchupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
