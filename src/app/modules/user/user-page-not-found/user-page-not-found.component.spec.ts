import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageNotFoundComponent } from './user-page-not-found.component';

describe('UserPageNotFoundComponent', () => {
  let component: UserPageNotFoundComponent;
  let fixture: ComponentFixture<UserPageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPageNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
