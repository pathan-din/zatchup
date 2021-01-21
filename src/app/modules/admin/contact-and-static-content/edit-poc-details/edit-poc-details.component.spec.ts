import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPocDetailsComponent } from './edit-poc-details.component';

describe('EditPocDetailsComponent', () => {
  let component: EditPocDetailsComponent;
  let fixture: ComponentFixture<EditPocDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPocDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPocDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
