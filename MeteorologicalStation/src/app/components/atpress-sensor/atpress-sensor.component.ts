import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowTrendDown, faArrowTrendUp, faCalculator, faChartColumn, faCircleHalfStroke, faPercent, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../../services/weather.service';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-atpress-sensor',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './atpress-sensor.component.html',
  styleUrl: './atpress-sensor.component.css'
})
export class AtpressSensorComponent {

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
  atpress: string ='-.-';
  private atpressSubscription: Subscription | null = null;

  ngOnInit(){
    this.socketService.connect();
    this.atpressSubscription = this.socketService.onPressure().subscribe((data: any) =>{
      this.atpress = data.pressure.toString();
      this.quantities.forEach(quantity => {
        if(data.hasOwnProperty(quantity.id)){
          quantity.value = data[quantity.id]
          console.log(quantity)
        }
      });
      console.log('Presion atmosferica:', this.atpress)
    });
    }

    ngOnDestroy(){
      if(this.atpressSubscription){
        this.atpressSubscription.unsubscribe();
      }
      this.socketService.disconnect();
    }
}
