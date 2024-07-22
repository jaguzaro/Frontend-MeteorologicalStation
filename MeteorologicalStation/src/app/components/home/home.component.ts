import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import 'animate.css'
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAnglesDown, faArrowTrendDown, faArrowTrendUp, faCalculator, faChartColumn, faCircleHalfStroke, faPercent, faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { WeatherSensorComponent } from "../weather-sensor/weather-sensor.component";
import { HumiditySensorComponent } from "../humidity-sensor/humidity-sensor.component";
import { WindSensorComponent } from "../wind-sensor/wind-sensor.component";
import { AtpressSensorComponent } from "../atpress-sensor/atpress-sensor.component";
import { LuminositySensorComponent } from "../luminosity-sensor/luminosity-sensor.component";
import { WindSpeedSensorComponent } from '../wind-speed-sensor/wind-speed-sensor.component';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    animations: [
        trigger('slideUpDown', [
            state('visible', style({
                transform: 'translateY(0%)',
            })),
            state('hidden', style({
                transform: 'translateY(-100%)',
                display: 'none'
            })),
            transition('visible => hidden', [
                animate('0.5s ease-in-out')
            ]),
            transition('hidden => visible', [
                style({
                    transform: 'translateY(100%)',
                    display: 'block'
                }),
                animate('0.5s ease-in-out')
            ]),
        ])
    ],
    imports: [CommonModule, FontAwesomeModule, WeatherSensorComponent, HumiditySensorComponent, WindSensorComponent, AtpressSensorComponent, LuminositySensorComponent, WindSpeedSensorComponent]
})
export class HomeComponent implements OnInit, OnDestroy{

    intervalId: any;

    constructor(private renderer: Renderer2) {}

    faPercent = faPercent;
    faCircleHalfStroke = faCircleHalfStroke;
    faChartColumn = faChartColumn;
    faArrowTrendUp = faArrowTrendUp;
    faArrowTrendDown = faArrowTrendDown
    faRankingStar = faRankingStar;
    faCalculator = faCalculator
    faAnglesDown = faAnglesDown

    currentSectionIndex = 0;
    quantities = [
        { name: 'Promedio', icon: faPercent, value: '1° C', date: '12-01-2024'},
        { name: 'Mediana', icon: faCircleHalfStroke, value: '1° C', date: '12-01-2024'},
        { name: 'Desviacion estandar', icon: faChartColumn, value: '1° C', date: '12-01-2024'},
        { name: 'Maximo', icon: faArrowTrendUp, value: '1° C' , date: '12-01-2024'},
        { name: 'Minimo', icon: faArrowTrendDown, value: '1° C' , date: '12-01-2024'},
        { name: 'Moda', icon: faRankingStar, value: '1° C', date: '12-01-2024'},
        { name: 'Cantidad de datos', icon: faCalculator, value: '1° C', date: '12-01-2024'}
    ]

    ngOnInit() {
        this.intervalId = setInterval(() => {
          this.addClassTemporarily();
        }, 5000);
      }
    
      ngOnDestroy() {
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
      }

    nextSection() {
        this.currentSectionIndex = (this.currentSectionIndex + 1) % 6;
    }

    addClassTemporarily() {
        console.log('get element')
        const container = document.getElementById('slide');
        console.log(container)
        if (container) {
            this.renderer.addClass(container, 'animate__animated');
            this.renderer.addClass(container, 'animate__shakeY');
            setTimeout(() => {
                console.log('remov element')
                this.renderer.removeClass(container, 'animate__animated');
                this.renderer.removeClass(container, 'animate__shakeY');
            }, 2000);
        }
    }
}

