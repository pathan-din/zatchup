import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminRequestChangingComponent } from './subadmin-request-changing.component';

describe('SubadminRequestChangingComponent', () => {
  let component: SubadminRequestChangingComponent;
  let fixture: ComponentFixture<SubadminRequestChangingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminRequestChangingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminRequestChangingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
