import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtpressSensorComponent } from './atpress-sensor.component';

describe('AtpressSensorComponent', () => {
  let component: AtpressSensorComponent;
  let fixture: ComponentFixture<AtpressSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtpressSensorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtpressSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
