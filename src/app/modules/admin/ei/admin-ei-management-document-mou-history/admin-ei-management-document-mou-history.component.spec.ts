import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEiManagementDocumentMouHistoryComponent } from './admin-ei-management-document-mou-history.component';

describe('AdminEiManagementDocumentMouHistoryComponent', () => {
  let component: AdminEiManagementDocumentMouHistoryComponent;
  let fixture: ComponentFixture<AdminEiManagementDocumentMouHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEiManagementDocumentMouHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEiManagementDocumentMouHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
