import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from 'src/services/weather.service';

@Component({
  selector: 'app-expanded-results',
  templateUrl: './expanded-results.component.html',
  styleUrls: ['./expanded-results.component.scss']
})
export class ExpandedResultsComponent implements OnInit {

  cityName

  selectedCityData

  constructor(private weatherService: WeatherService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.weatherService.getWeatherByCoordinates(params["lat"],params["lon"]).subscribe((weatherResult:any)=>{
        this.selectedCityData = weatherResult.list
        this.cityName = `${weatherResult.city.name} / ${weatherResult.city.country}`
      })
    })
  }

  sortBy(key){
    this.selectedCityData.sort((a,b)=>{
      if(key === 'dt_txt'){
        return b.dt_txt - a.dt_txt
      }else{
        return b.main[key] - a.main[key]
      }
    })
  }

}
