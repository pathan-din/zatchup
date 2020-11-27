import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPocDetailsComponent } from './my-poc-details.component';

describe('MyPocDetailsComponent', () => {
  let component: MyPocDetailsComponent;
  let fixture: ComponentFixture<MyPocDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPocDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPocDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
