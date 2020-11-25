import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEiManagementAlumniListComponent } from './admin-ei-management-alumni-list.component';

describe('AdminEiManagementAlumniListComponent', () => {
  let component: AdminEiManagementAlumniListComponent;
  let fixture: ComponentFixture<AdminEiManagementAlumniListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEiManagementAlumniListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEiManagementAlumniListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
