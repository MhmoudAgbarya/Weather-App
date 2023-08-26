import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CityService } from 'src/services/city.service';
import { WeatherService } from 'src/services/weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  result: any;

  form: FormGroup = new FormGroup({});

  cityName

  tableSettings = {
    cols:[
      {key:"name",label:"City Name"},
      {key:"country",label:"Country"},
      {key:"state",label:"State (for US only)"},
      {key:"temp",label:"Temperature"},
      {key:"temp_max",label:"Max Temperature"},
      {key:"temp_min",label:"Min Temperature"},
      {key:"feels_like",label:"Feels Like"},
      {key:"pressure",label:"Pressure"},
      {key:"humidity",label:"Humidity"},
      {key:"sea_level",label:"Sea Level"}
    ]}

  constructor(private weatherService: WeatherService, private cityService: CityService) {  }

  ngOnInit(): void {
    this.form = new FormGroup({
      cityName: new FormControl("")
    })
  }

  getData(){
    this.cityName = this.form.get("cityName")?.value
    if(!this.cityName){
      return;
    }
    this.cityService.getCitiesByName(this.cityName).subscribe(res=>{
      this.result = res;
      this.result.forEach((city: any) => {
        this.weatherService.getWeatherByCoordinates(city.lat,city.lon).subscribe((weatherResult:any)=>{
          Object.assign(city, weatherResult.list[0].main)
        })
      });
    })
  }

}
