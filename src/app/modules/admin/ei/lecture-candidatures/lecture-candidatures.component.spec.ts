import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureCandidaturesComponent } from './lecture-candidatures.component';

describe('LectureCandidaturesComponent', () => {
  let component: LectureCandidaturesComponent;
  let fixture: ComponentFixture<LectureCandidaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectureCandidaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureCandidaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
