import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarclassManagementComponent } from './starclass-management.component';

describe('StarclassManagementComponent', () => {
  let component: StarclassManagementComponent;
  let fixture: ComponentFixture<StarclassManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarclassManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarclassManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
