import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiStarclassAudienceComponent } from './ei-starclass-audience.component';

describe('EiStarclassAudienceComponent', () => {
  let component: EiStarclassAudienceComponent;
  let fixture: ComponentFixture<EiStarclassAudienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiStarclassAudienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiStarclassAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
