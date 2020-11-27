import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadmincongratulationComponent } from './subadmincongratulation.component';

describe('SubadmincongratulationComponent', () => {
  let component: SubadmincongratulationComponent;
  let fixture: ComponentFixture<SubadmincongratulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadmincongratulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadmincongratulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
