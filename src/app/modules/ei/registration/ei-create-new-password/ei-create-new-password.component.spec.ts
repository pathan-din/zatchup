import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiCreateNewPasswordComponent } from './ei-create-new-password.component';

describe('EiCreateNewPasswordComponent', () => {
  let component: EiCreateNewPasswordComponent;
  let fixture: ComponentFixture<EiCreateNewPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiCreateNewPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiCreateNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
