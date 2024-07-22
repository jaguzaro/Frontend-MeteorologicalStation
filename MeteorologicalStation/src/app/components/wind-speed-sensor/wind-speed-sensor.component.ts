import { Component } from '@angular/core';
import { faArrowTrendDown, faArrowTrendUp, faCalculator, faChartColumn, faCircleHalfStroke, faPercent, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../../services/weather.service';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-wind-speed-sensor',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './wind-speed-sensor.component.html',
  styleUrl: './wind-speed-sensor.component.css'
})
export class WindSpeedSensorComponent {
  faPercent = faPercent;
  faCircleHalfStroke = faCircleHalfStroke;
  faChartColumn = faChartColumn;
  faArrowTrendUp = faArrowTrendUp;
  faArrowTrendDown = faArrowTrendDown
  faRankingStar = faRankingStar;
  faCalculator = faCalculator

  constructor(private weatherServices:WeatherService, private socketService: SocketService){}

  currentSectionIndex = 0;
  quantities = [
    { name: 'Promedio', icon: faPercent, value: '1° C', date: '12-01-2024', id: 'average'},
    { name: 'Mediana', icon: faCircleHalfStroke, value: '1° C', date: '12-01-2024', id: 'median'},
    { name: 'Desviacion estandar', icon: faChartColumn, value: '1° C', date: '12-01-2024', id: 'deviation'},
    { name: 'Maximo', icon: faArrowTrendUp, value: '1° C' , date: '12-01-2024', id:'maximum'},
    { name: 'Minimo', icon: faArrowTrendDown, value: '1° C' , date: '12-01-2024', id: 'minimum'},
    { name: 'Moda', icon: faRankingStar, value: '1° C', date: '12-01-2024', id:'mode'},
    { name: 'Cantidad de datos', icon: faCalculator, value: '1° C', date: '12-01-2024', id:'counter'}
  ]

  data: any;
  windSpeed: string ='-.-';
  private windSpeedSubscription: Subscription | null = null;

  ngOnInit(){
    this.socketService.connect();
    this.windSpeedSubscription = this.socketService.onWindSpeed().subscribe((data: any) =>{
      this.windSpeed = data.windSpeed.toString();
      this.quantities.forEach(quantity => {
        if(data.hasOwnProperty(quantity.id)){
          quantity.value = data[quantity.id]
          console.log(quantity)
        }
      });
      console.log('Sensor de velocidad-viento:', this.windSpeed)
    });
    }

    ngOnDestroy(){
      if(this.windSpeedSubscription){
        this.windSpeedSubscription.unsubscribe();
      }
      this.socketService.disconnect();
    }
}
