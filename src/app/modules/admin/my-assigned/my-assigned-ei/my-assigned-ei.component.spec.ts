import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssignedEiComponent } from './my-assigned-ei.component';

describe('MyAssignedEiComponent', () => {
  let component: MyAssignedEiComponent;
  let fixture: ComponentFixture<MyAssignedEiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAssignedEiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAssignedEiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
