import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NetService {

  constructor(private http: HttpClient) { }

  getWeatherByCityName(cityName: string){
    return this.http.get(`${environment.weatherApiUrl}?q=${cityName}&limit=5&appid=${environment.apiKey}`)
  }

  getWeatherByCoordinates(lat: string, lon: string){
    return this.http.get(`${environment.weatherApiUrl}?lat=${lat}&lon=${lon}&appid=${environment.apiKey}`)
  }

  getCitiesByName(cityName: string){
    return this.http.get(`${environment.geoApiUrl}/direct?q=${cityName}&limit=5&appid=${environment.apiKey}`)
  }
}
