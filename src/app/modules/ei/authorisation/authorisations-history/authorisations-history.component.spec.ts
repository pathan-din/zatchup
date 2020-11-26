import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisationsHistoryComponent } from './authorisations-history.component';

describe('AuthorisationsHistoryComponent', () => {
  let component: AuthorisationsHistoryComponent;
  let fixture: ComponentFixture<AuthorisationsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorisationsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisationsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
