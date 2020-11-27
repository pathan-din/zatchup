import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminprofileComponent } from './subadminprofile.component';

describe('SubadminprofileComponent', () => {
  let component: SubadminprofileComponent;
  let fixture: ComponentFixture<SubadminprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
