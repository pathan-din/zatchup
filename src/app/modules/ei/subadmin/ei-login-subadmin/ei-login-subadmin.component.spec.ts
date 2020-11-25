import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiLoginSubadminComponent } from './ei-login-subadmin.component';

describe('EiLoginSubadminComponent', () => {
  let component: EiLoginSubadminComponent;
  let fixture: ComponentFixture<EiLoginSubadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiLoginSubadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiLoginSubadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
