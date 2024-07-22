import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }
  
  connect(){ this.socket.connect();}
  disconnect(){this.socket.disconnect();}

  onTemperature () {
    return this.socket.fromEvent<any>('Temperature')
  }

  onHumidity () {
    return this.socket.fromEvent<any>('Humidity')
  }

  onPressure () {
    return this.socket.fromEvent<any>('Pressure')
  }

  onWindSpeed () {
    return this.socket.fromEvent<any>('WindSpeed')
  }

  onLuminosity () {
    return this.socket.fromEvent<any>('Luminosity')
  }

  onAirQuality () {
    return this.socket.fromEvent<any>('AirQuality')
  }

}
