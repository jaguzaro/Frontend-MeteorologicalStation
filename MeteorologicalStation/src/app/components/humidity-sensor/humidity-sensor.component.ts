import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowTrendDown, faArrowTrendUp, faCalculator, faChartColumn, faCircleHalfStroke, faPercent, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { SocketService } from '../../services/socket.service';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-humidity-sensor',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './humidity-sensor.component.html',
  styleUrl: './humidity-sensor.component.css'
})

export class HumiditySensorComponent {
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
  humidity: string ='-.-';
  private humiditySubscription: Subscription | null = null;

  ngOnInit(){
    this.socketService.connect();
    this.humiditySubscription = this.socketService.onHumidity().subscribe((data: any) =>{
      this.humidity = data.humidity.toString();
      this.quantities.forEach(quantity => {
        if(data.hasOwnProperty(quantity.id)){
          quantity.value = data[quantity.id]
          console.log(quantity)
        }
      });
      console.log('Humedad:', this.humidity)
    });
    }

    ngOnDestroy(){
      if(this.humiditySubscription){
        this.humiditySubscription.unsubscribe();
      }
      this.socketService.disconnect();
    }
}
