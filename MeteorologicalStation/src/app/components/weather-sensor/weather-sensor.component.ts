import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowTrendDown, faArrowTrendUp, faCalculator, faChartColumn, faCircleHalfStroke, faPercent, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SocketService } from '../../services/socket.service';
import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'app-weather-sensor',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './weather-sensor.component.html',
  styleUrl: './weather-sensor.component.css'
})
export class WeatherSensorComponent {

  constructor(private weatherServices:WeatherService ,private socketService: SocketService){}

  faPercent = faPercent;
  faCircleHalfStroke = faCircleHalfStroke;
  faChartColumn = faChartColumn;
  faArrowTrendUp = faArrowTrendUp;
  faArrowTrendDown = faArrowTrendDown
  faRankingStar = faRankingStar;
  faCalculator = faCalculator

  currentSectionIndex = 0;
  

  private temperatureSubcrition: Subscription | null = null;

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
  temperature: string ='-.-';

  ngOnInit(){
    this.socketService.connect();
    this.temperatureSubcrition = this.socketService.onTemperature().subscribe((data: any) =>{
      this.temperature = data.temperature.toString();
      this.quantities.forEach(quantity => {
        if(data.hasOwnProperty(quantity.id)){
          quantity.value = data[quantity.id]
          console.log(quantity)
        }
      });
      console.log('temperatura:', this.temperature)
    });
    }

    ngOnDestroy(){
      if(this.temperatureSubcrition){
        this.temperatureSubcrition.unsubscribe();
      }
      this.socketService.disconnect();
    }
}
