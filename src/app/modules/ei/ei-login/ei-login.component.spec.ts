import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiLoginComponent } from './ei-login.component';

describe('EiLoginComponent', () => {
  let component: EiLoginComponent;
  let fixture: ComponentFixture<EiLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
