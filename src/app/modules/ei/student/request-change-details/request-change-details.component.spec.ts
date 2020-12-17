import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestChangeDetailsComponent } from './request-change-details.component';

describe('RequestChangeDetailsComponent', () => {
  let component: RequestChangeDetailsComponent;
  let fixture: ComponentFixture<RequestChangeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestChangeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestChangeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
