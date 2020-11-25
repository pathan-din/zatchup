import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddMoreStandardComponent } from './user-add-more-standard.component';

describe('UserAddMoreStandardComponent', () => {
  let component: UserAddMoreStandardComponent;
  let fixture: ComponentFixture<UserAddMoreStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddMoreStandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddMoreStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
