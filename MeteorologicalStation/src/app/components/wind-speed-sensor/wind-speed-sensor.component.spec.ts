import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindSpeedSensorComponent } from './wind-speed-sensor.component';

describe('WindSpeedSensorComponent', () => {
  let component: WindSpeedSensorComponent;
  let fixture: ComponentFixture<WindSpeedSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindSpeedSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WindSpeedSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
