import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarclassRequestsPendingComponent } from './starclass-requests-pending.component';

describe('StarclassRequestsPendingComponent', () => {
  let component: StarclassRequestsPendingComponent;
  let fixture: ComponentFixture<StarclassRequestsPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarclassRequestsPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarclassRequestsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
