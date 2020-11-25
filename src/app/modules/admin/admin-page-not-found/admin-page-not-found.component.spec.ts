import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageNotFoundComponent } from './admin-page-not-found.component';

describe('AdminPageNotFoundComponent', () => {
  let component: AdminPageNotFoundComponent;
  let fixture: ComponentFixture<AdminPageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPageNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
