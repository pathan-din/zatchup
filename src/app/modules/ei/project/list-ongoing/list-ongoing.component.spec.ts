import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOngoingComponent } from './list-ongoing.component';

describe('ListOngoingComponent', () => {
  let component: ListOngoingComponent;
  let fixture: ComponentFixture<ListOngoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOngoingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOngoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
