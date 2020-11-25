import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAddedComponent } from './status-added.component';

describe('StatusAddedComponent', () => {
  let component: StatusAddedComponent;
  let fixture: ComponentFixture<StatusAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusAddedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
