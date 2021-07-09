import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminHistoryComponent } from './subadmin-history.component';

describe('SubadminHistoryComponent', () => {
  let component: SubadminHistoryComponent;
  let fixture: ComponentFixture<SubadminHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
