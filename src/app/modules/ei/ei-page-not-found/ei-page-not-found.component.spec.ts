import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiPageNotFoundComponent } from './ei-page-not-found.component';

describe('EiPageNotFoundComponent', () => {
  let component: EiPageNotFoundComponent;
  let fixture: ComponentFixture<EiPageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiPageNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
