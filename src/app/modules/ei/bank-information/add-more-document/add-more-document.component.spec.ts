import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoreDocumentComponent } from './add-more-document.component';

describe('AddMoreDocumentComponent', () => {
  let component: AddMoreDocumentComponent;
  let fixture: ComponentFixture<AddMoreDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMoreDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoreDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
