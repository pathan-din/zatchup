import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EiEresultPreviewComponent } from './ei-eresult-preview.component';

describe('EiEresultPreviewComponent', () => {
  let component: EiEresultPreviewComponent;
  let fixture: ComponentFixture<EiEresultPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EiEresultPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EiEresultPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
