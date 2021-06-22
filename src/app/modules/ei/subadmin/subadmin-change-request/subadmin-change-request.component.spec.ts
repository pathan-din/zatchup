import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminChangeRequestComponent } from './subadmin-change-request.component';

describe('SubadminChangeRequestComponent', () => {
  let component: SubadminChangeRequestComponent;
  let fixture: ComponentFixture<SubadminChangeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminChangeRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
