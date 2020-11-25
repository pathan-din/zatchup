import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserPostComponent } from './admin-user-post.component';

describe('AdminUserPostComponent', () => {
  let component: AdminUserPostComponent;
  let fixture: ComponentFixture<AdminUserPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
