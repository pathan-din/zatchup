import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DormantUsersComponent } from './dormant-users.component';

describe('DormantUsersComponent', () => {
  let component: DormantUsersComponent;
  let fixture: ComponentFixture<DormantUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DormantUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DormantUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
