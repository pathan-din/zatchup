import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminschoolconfirmationComponent } from './subadminschoolconfirmation.component';

describe('SubadminschoolconfirmationComponent', () => {
  let component: SubadminschoolconfirmationComponent;
  let fixture: ComponentFixture<SubadminschoolconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminschoolconfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminschoolconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
