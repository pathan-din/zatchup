import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSubadminAdditionalComponent } from './ei-subadmin-additional.component';

describe('EiSubadminAdditionalComponent', () => {
  let component: EiSubadminAdditionalComponent;
  let fixture: ComponentFixture<EiSubadminAdditionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSubadminAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSubadminAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
