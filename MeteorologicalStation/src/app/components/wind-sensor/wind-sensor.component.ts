import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowTrendDown, faArrowTrendUp, faBiohazard, faCalculator, faChartColumn, faCircleHalfStroke, faPercent, faRankingStar, faWind } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../../services/weather.service';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wind-sensor',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './wind-sensor.component.html',
  styleUrl: './wind-sensor.component.css'
})
export class WindSensorComponent {
  faBiohazard = faBiohazard
  faWind = faWind

  constructor(private weatherServices:WeatherService, private socketService: SocketService){}

  currentSectionIndex = 0;
  quantities = [
    { name: 'Contador de aire bueno', icon: faWind, value: '1', date: '12-01-2024', id: "well"},
    { name: 'Contador de aire malo', icon: faBiohazard, value: '1', date: '12-01-2024', id: "bad"},
  ]

  data: any;
  wind: string ='-.-';
  private windSubscription: Subscription | null = null;

  ngOnInit(){
    this.socketService.connect();
    this.windSubscription = this.socketService.onAirQuality().subscribe((data: any) =>{
      this.wind = data.airQuality.toString();
      this.quantities.forEach(quantity => {
        if(data.hasOwnProperty(quantity.id)){
          quantity.value = data[quantity.id]
          console.log(quantity)
        }
      });
      this.wind = this.quantities[0] > this.quantities[1] ? 'Bueno' : 'Malo'; 
    });
    }

    ngOnDestroy(){
      if(this.windSubscription){
        this.windSubscription.unsubscribe();
      }
      this.socketService.disconnect();
    }
}
