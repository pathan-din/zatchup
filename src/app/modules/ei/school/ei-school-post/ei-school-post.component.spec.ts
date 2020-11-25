import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSchoolPostComponent } from './ei-school-post.component';

describe('EiSchoolPostComponent', () => {
  let component: EiSchoolPostComponent;
  let fixture: ComponentFixture<EiSchoolPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiSchoolPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSchoolPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
