import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiProfilePreviewComponent } from './ei-profile-preview.component';

describe('EiProfilePreviewComponent', () => {
  let component: EiProfilePreviewComponent;
  let fixture: ComponentFixture<EiProfilePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiProfilePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiProfilePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
