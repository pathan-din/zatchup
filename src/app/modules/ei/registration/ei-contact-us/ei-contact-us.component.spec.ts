import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiContactUsComponent } from './ei-contact-us.component';

describe('EiContactUsComponent', () => {
  let component: EiContactUsComponent;
  let fixture: ComponentFixture<EiContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
