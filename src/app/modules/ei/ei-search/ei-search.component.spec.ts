import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EiSearchComponent } from './ei-search.component';

describe('EiSearchComponent', () => {
  let component: EiSearchComponent;
  let fixture: ComponentFixture<EiSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EiSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
