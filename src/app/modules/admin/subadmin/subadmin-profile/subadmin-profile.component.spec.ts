import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminProfileComponent } from './subadmin-profile.component';

describe('SubadminProfileComponent', () => {
  let component: SubadminProfileComponent;
  let fixture: ComponentFixture<SubadminProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
