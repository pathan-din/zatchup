import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPastEiComponent } from './add-past-ei.component';

describe('AddPastEiComponent', () => {
  let component: AddPastEiComponent;
  let fixture: ComponentFixture<AddPastEiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPastEiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPastEiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
