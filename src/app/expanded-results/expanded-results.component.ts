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

  selectedCityData = []

  graphDataReady = false

  tableSettings = {
    cols:[
      {key:"dt_txt",label:"Time", sortBy: "dt"},
      {key:"temp",label:"Temperature"},
      {key:"temp_max",label:"Max Temperature"},
      {key:"temp_min",label:"Min Temperature"},
      {key:"feels_like",label:"Feels Like"},
      {key:"pressure",label:"Pressure"},
      {key:"humidity",label:"Humidity"},
      {key:"sea_level",label:"Sea Level"}
    ]}

  

  constructor(private weatherService: WeatherService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.weatherService.getWeatherByCoordinates(params["lat"],params["lon"]).subscribe((weatherResult:any)=>{
        weatherResult.list.forEach(e=> {
          const temp = Object.assign({}, e.main);
          temp.dt_txt = e.dt_txt
          temp.dt = e.dt
          this.selectedCityData.push(temp)
        })
        this.cityName = `${weatherResult.city.name} / ${weatherResult.city.country}`
        this.graphDataReady = true
      })
    })
  }

}
