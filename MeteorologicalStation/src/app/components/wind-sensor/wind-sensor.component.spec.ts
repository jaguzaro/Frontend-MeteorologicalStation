import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindSensorComponent } from './wind-sensor.component';

describe('WindSensorComponent', () => {
  let component: WindSensorComponent;
  let fixture: ComponentFixture<WindSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
