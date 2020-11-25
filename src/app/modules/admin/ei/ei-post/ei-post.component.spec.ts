import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiPostComponent } from './ei-post.component';

describe('EiPostComponent', () => {
  let component: EiPostComponent;
  let fixture: ComponentFixture<EiPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
