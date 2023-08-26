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

  constructor(private weatherService: WeatherService, private cityService: CityService) {  }

  ngOnInit(): void {
    this.form = new FormGroup({
      cityName: new FormControl("")
    })
  }

  getData(){
    let value = this.form.get("cityName")?.value
    if(!value){
      return;
    }
    this.cityService.getCitiesByName(value).subscribe(res=>{
      this.result = res;
      this.result.forEach((city: any) => {
        this.weatherService.getWeatherByCoordinates(city.lat,city.lon).subscribe((weatherResult:any)=>{
          city.weatherSlim = weatherResult.list[0].main
          city.weather = weatherResult.list
        })
      });
    })
  }

}
