import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPocComponent } from './current-poc.component';

describe('CurrentPocComponent', () => {
  let component: CurrentPocComponent;
  let fixture: ComponentFixture<CurrentPocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentPocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
