import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddMoreEiComponent } from './user-add-more-ei.component';

describe('UserAddMoreEiComponent', () => {
  let component: UserAddMoreEiComponent;
  let fixture: ComponentFixture<UserAddMoreEiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddMoreEiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddMoreEiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
