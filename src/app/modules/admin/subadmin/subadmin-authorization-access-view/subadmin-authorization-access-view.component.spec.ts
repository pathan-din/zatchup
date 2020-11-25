import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminAuthorizationAccessViewComponent } from './subadmin-authorization-access-view.component';

describe('SubadminAuthorizationAccessViewComponent', () => {
  let component: SubadminAuthorizationAccessViewComponent;
  let fixture: ComponentFixture<SubadminAuthorizationAccessViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminAuthorizationAccessViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminAuthorizationAccessViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
