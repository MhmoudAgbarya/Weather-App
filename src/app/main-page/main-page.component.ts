import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from 'src/services/city.service';
import { WeatherService } from 'src/services/weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  result: any;

  form: FormGroup = new FormGroup({});

  cityName;

  searchHistory = JSON.parse(localStorage.getItem('searchHistory'));

  loading = false;

  tableSettings = {
    cols: [
      { key: 'name', label: 'City Name' },
      { key: 'country', label: 'Country' },
      { key: 'state', label: 'State (for US only)' },
      { key: 'temp', label: 'Temperature' },
      { key: 'temp_max', label: 'Max Temperature' },
      { key: 'temp_min', label: 'Min Temperature' },
      { key: 'feels_like', label: 'Feels Like' },
      { key: 'pressure', label: 'Pressure' },
      { key: 'humidity', label: 'Humidity' },
      { key: 'sea_level', label: 'Sea Level' },
    ],
  };

  constructor(
    private weatherService: WeatherService,
    private cityService: CityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      cityName: new FormControl(''),
    });
  }

  search() {
    this.loading = true;
    this.cityName = this.form.get('cityName')?.value;
    if (!this.cityName) {
      this.loading = false;
      return;
    }
    this.saveToHistory();
    this.getData();
  }

  getData() {
    this.cityService.getCitiesByName(this.cityName).subscribe((res) => {
      this.result = res;
      localStorage.setItem('cityList', JSON.stringify(res));
      this.result.forEach((city: any) => {
        this.weatherService
          .getWeatherByCoordinates(city.lat, city.lon)
          .subscribe((weatherResult: any) => {
            Object.assign(city, weatherResult.list[0].main);
            this.loading = false;
          });
      });
    });
  }

  saveToHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory'));
    if (history) {
      this.searchHistory = [...history, this.cityName];
    } else {
      this.searchHistory = [this.cityName];
    }
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
  }

  searchFromHistory(cityName) {
    this.loading = true;
    this.cityName = cityName;
    if (!this.cityName) {
      this.loading = false;
      return;
    }
    this.getData();
  }

  onRowClicked(row) {
    this.router.navigate([`/extended-city-data/${row.lat}/${row.lon}`]);
  }

  clearHistory() {
    localStorage.clear();
  }
}
