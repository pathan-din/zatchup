import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiUserSearchProfileComponent } from './ei-user-search-profile.component';

describe('EiUserSearchProfileComponent', () => {
  let component: EiUserSearchProfileComponent;
  let fixture: ComponentFixture<EiUserSearchProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiUserSearchProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiUserSearchProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
