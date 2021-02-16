import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContectAndStaticContentManagementComponent } from './contect-and-static-content-management.component';

describe('ContectAndStaticContentManagementComponent', () => {
  let component: ContectAndStaticContentManagementComponent;
  let fixture: ComponentFixture<ContectAndStaticContentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContectAndStaticContentManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContectAndStaticContentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
