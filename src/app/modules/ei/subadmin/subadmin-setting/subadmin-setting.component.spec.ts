import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminSettingComponent } from './subadmin-setting.component';

describe('SubadminSettingComponent', () => {
  let component: SubadminSettingComponent;
  let fixture: ComponentFixture<SubadminSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
