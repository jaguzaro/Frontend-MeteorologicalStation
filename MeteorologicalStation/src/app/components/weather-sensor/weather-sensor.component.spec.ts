import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSensorComponent } from './weather-sensor.component';

describe('WeatherSensorComponent', () => {
  let component: WeatherSensorComponent;
  let fixture: ComponentFixture<WeatherSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
