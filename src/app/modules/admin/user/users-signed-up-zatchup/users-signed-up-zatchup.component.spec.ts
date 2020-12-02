import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSignedUpZatchupComponent } from './users-signed-up-zatchup.component';

describe('UsersSignedUpZatchupComponent', () => {
  let component: UsersSignedUpZatchupComponent;
  let fixture: ComponentFixture<UsersSignedUpZatchupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersSignedUpZatchupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSignedUpZatchupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
