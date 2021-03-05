import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPlansComponent } from './current-plans.component';

describe('CurrentPlansComponent', () => {
  let component: CurrentPlansComponent;
  let fixture: ComponentFixture<CurrentPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
