import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminAccessHistoryComponent } from './subadmin-access-history.component';

describe('SubadminAccessHistoryComponent', () => {
  let component: SubadminAccessHistoryComponent;
  let fixture: ComponentFixture<SubadminAccessHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminAccessHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminAccessHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
