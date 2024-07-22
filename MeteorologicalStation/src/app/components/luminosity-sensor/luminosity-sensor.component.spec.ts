import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuminositySensorComponent } from './luminosity-sensor.component';

describe('LuminositySensorComponent', () => {
  let component: LuminositySensorComponent;
  let fixture: ComponentFixture<LuminositySensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuminositySensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LuminositySensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
