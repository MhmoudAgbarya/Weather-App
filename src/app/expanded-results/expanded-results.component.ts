import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from 'src/services/weather.service';

@Component({
  selector: 'app-expanded-results',
  templateUrl: './expanded-results.component.html',
  styleUrls: ['./expanded-results.component.scss'],
})
export class ExpandedResultsComponent implements OnInit {
  cityNameOptions;

  form: FormGroup = new FormGroup({});

  selectedCityData = [];

  graphDataReady = false;

  tableSettings = {
    cols: [
      { key: 'dt_txt', label: 'Time', sortBy: 'dt' },
      { key: 'temp', label: 'Temperature' },
      { key: 'temp_max', label: 'Max Temperature' },
      { key: 'temp_min', label: 'Min Temperature' },
      { key: 'feels_like', label: 'Feels Like' },
      { key: 'pressure', label: 'Pressure' },
      { key: 'humidity', label: 'Humidity' },
      { key: 'description', label: 'Weather Description', customSort: true },
    ],
  };

  constructor(
    private weatherService: WeatherService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.weatherService
        .getWeatherByCoordinates(params['lat'], params['lon'])
        .subscribe((weatherResult: any) => {
          weatherResult.list.forEach((e) => {
            const temp = Object.assign({}, e.main, e.weather[0]);
            temp.dt_txt = e.dt_txt;
            temp.dt = e.dt;
            this.selectedCityData.push(temp);
          });
          this.setForm(params['lat'], params['lon']);
          this.graphDataReady = true;
        });
    });
  }

  setForm(lat, lon) {
    const cityList = JSON.parse(localStorage.getItem('cityList'));
    this.cityNameOptions = cityList.map((city) => {
      return {
        label: `${city.name} / ${city.country}`,
        key: { lat: city.lat, lon: city.lon },
      };
    });
    const index = this.cityNameOptions.findIndex(
      (o) => o.key.lat == lat && o.key.lon == lon
    );
    this.form = new FormGroup({
      cityName: new FormControl(this.cityNameOptions[index].key),
    });
    this.form.controls['cityName'].valueChanges.subscribe((option) => {
      this.router
        .navigate([`/extended-city-data/${option.lat}/${option.lon}`])
        .then((p) => {
          window.location.reload();
        });
    });
  }

  sortDescriptions(event) {
    this.selectedCityData.sort((a, b) => {
      if (event.sortDirection === 'ASC') {
        return a[event.key].localeCompare(b[event.key]);
      } else {
        return b[event.key].localeCompare(a[event.key]);
      }
    });
  }
}
