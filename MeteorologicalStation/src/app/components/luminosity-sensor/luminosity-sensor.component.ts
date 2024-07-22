import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowTrendDown, faArrowTrendUp, faCalculator, faChartColumn, faCircleHalfStroke, faCloud, faPercent, faRankingStar, faSun } from '@fortawesome/free-solid-svg-icons';
import { SocketService } from '../../services/socket.service';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-luminosity-sensor',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './luminosity-sensor.component.html',
  styleUrl: './luminosity-sensor.component.css'
})
export class LuminositySensorComponent {
  faSun = faSun
  faCloud = faCloud

  constructor(private weatherServices:WeatherService, private socketService: SocketService){}

  currentSectionIndex = 0;
  state = 'Soleado'
  quantities = [
    { name: 'Soleado', icon: faSun, value: 'Hay Luz', date: '12-01-2024'},
    { name: 'Nublado', icon: faCloud, value: 'No hay Luz', date: '12-01-2024'},
  ]

  private luminositySubscription: Subscription | null = null;

  isBackgroundChanged = false;
  isFading = false;

  changeBackground() {
    this.isFading = true;
    this.isBackgroundChanged = !this.isBackgroundChanged;
    this.state = this.isBackgroundChanged ? 'Nublado' : 'Soleado';
  }

  onAnimationEnd() {
    this.isFading = false;
    //this.isBackgroundChanged = !this.isBackgroundChanged;
  }

  ngOnInit(){
    this.socketService.connect();
    this.luminositySubscription = this.socketService.onLuminosity().subscribe((data: any) =>{
      if(data.luminosity == "Day" || data.luminosity == "Night"){
        this.changeBackground();
      }
      console.log('Luminosidad:', this.state)
    });
    }

    ngOnDestroy(){
      if(this.luminositySubscription){
        this.luminositySubscription.unsubscribe();
      }
      this.socketService.disconnect();
    }
}
