import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddEiComponent } from './user-add-ei.component';

describe('UserAddEiComponent', () => {
  let component: UserAddEiComponent;
  let fixture: ComponentFixture<UserAddEiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddEiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddEiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
