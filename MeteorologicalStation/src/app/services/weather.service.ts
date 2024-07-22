import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  
  private apiURL = 'http://192.168.0.13:4200/';

  constructor(private http: HttpClient) { }

  //end point of sensor temperature
  getTemperature(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}getTemperature`, {observe: 'response'})
    .pipe(map((res: HttpResponse<any>) => {
      console.log('status code:', res.status);
      console.log('response body:', res.body);
      return {
        statusCode: res.status,
        data: res.body
      };
   }));
  }

  //end point of sensor humidity
  getHumidity(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}getHumidity`, {observe: 'response'})
      .pipe(map((res: HttpResponse<any>)=>{
        console.log('status code:', res.status);
        console.log('response body:', res.body);
        return {
          statusCode: res.status,
          data: res.body
        };
      }));
  }

  // end point of sensor pressure
  getPressure(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}getPressure`, {observe: 'response'})
    .pipe(map((res: HttpResponse<any>)=>{
      console.log('status code:', res.status);
      console.log('response body:', res.body);
      return{
        statusCode: res.status,
        data: res.body
      };
    }));
  }

  // end point of sensor wind Speed
  getWindSpeed(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}getWindSpeed`, {observe: 'response'})
    .pipe(map((res: HttpResponse<any>)=>{
      console.log('status code:', res.status);
      console.log('response body:', res.body);

      return{
        statusCode: res.status,
        data: res.body
      };
    }));
  }

  // end point of sendor luminosity
  getLuminosity(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}getLuminosity`, {observe: 'response'})
    .pipe(map((res: HttpResponse<any>) => {
      console.log('status code:', res.status);
      console.log('response body:', res.body);

      return{
        statusCode: res.status,
        data: res.body
      };
    }));
  }

  // end point of sensor air quality
  getAirQuality(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}getAirQuality`, {observe: 'response'})
    .pipe(map((res: HttpResponse<any>) =>{
      console.log('status code:', res.status);
      console.log('response body:', res.body);

      return{
        statusCode: res.status,
        data: res.body
      };
    }));
  }
}

