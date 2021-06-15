import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupParticipentComponent } from './edit-group-participent.component';

describe('EditGroupParticipentComponent', () => {
  let component: EditGroupParticipentComponent;
  let fixture: ComponentFixture<EditGroupParticipentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGroupParticipentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupParticipentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
