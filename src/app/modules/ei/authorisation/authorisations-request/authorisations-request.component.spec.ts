import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisationsRequestComponent } from './authorisations-request.component';

describe('AuthorisationsRequestComponent', () => {
  let component: AuthorisationsRequestComponent;
  let fixture: ComponentFixture<AuthorisationsRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorisationsRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisationsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
