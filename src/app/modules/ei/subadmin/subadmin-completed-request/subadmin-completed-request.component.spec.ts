import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminCompletedRequestComponent } from './subadmin-completed-request.component';

describe('SubadminCompletedRequestComponent', () => {
  let component: SubadminCompletedRequestComponent;
  let fixture: ComponentFixture<SubadminCompletedRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminCompletedRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminCompletedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
