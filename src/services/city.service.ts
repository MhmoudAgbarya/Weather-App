import { Injectable } from '@angular/core';
import { NetService } from './net.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private netService: NetService) { }



  getCitiesByName(cityName: string){
    return this.netService.getCitiesByName(cityName)
  }
}
