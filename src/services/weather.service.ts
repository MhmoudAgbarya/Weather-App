import { Injectable } from '@angular/core';
import { NetService } from './net.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private netService: NetService) { }

  getWeatherByCityName(cityName: string){
    return this.netService.getWeatherByCityName(cityName)
  }

  getWeatherByCoordinates(lat: string, lon: string){
    return this.netService.getWeatherByCoordinates(lat,lon)
  }
}
