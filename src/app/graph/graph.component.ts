import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import axios from 'axios';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const days: any[] = [];
    const pressures: any[] = [];
    const temperatures: any[] = [];
    const windspeed: any[] = [];
    axios.get('https://api.openweathermap.org/data/2.5/onecall', {
      params: {
        lat: 41.3082,
        lon: 69.2598,
        exclude: 'minutely,hourly',
        appid: '6da25ee14f7831e52f0d5726906635d6',
      }
    }).then(res => {
      res.data.daily.forEach((value: any) => {
        days.push(new Date(value.dt * 1000).toDateString());
        pressures.push(value.pressure);
        temperatures.push(value.temp.day - 273.15);
        windspeed.push(value.wind_speed);
      });
      // console.log(days);
      this.createGraph(days, pressures, temperatures, windspeed);
    });
  }

  createGraph(days: Array<any>, pressures: Array<any>, temperatures: Array<any>, windspeed: Array<any>): void {
    Highcharts.chart('weatherChart', {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Asia/Tashkent',
        align: 'right'
      },
      xAxis: {
        categories: days
      },
      yAxis: [
        {
          title: {
            text: 'Температура (C°)'
          }
        },
        {
          title: {
            text: 'Скорость ветра (m/s)'
          },
          opposite: true
        },
        {
          title: {
            text: 'Давление (hPa)'
          },
          opposite: true
        }
      ],

      series: [
        {
          name: 'Temperature (C°)',
          type: 'line',
          yAxis: 0,
          data: temperatures
        },
        {
          name: 'Wind speed (m/s)',
          type: 'area',
          yAxis: 1,
          data: windspeed,
        },
        {
          name: 'Pressure (hPa)',
          type: 'line',
          yAxis: 2,
          data: pressures
        }
      ]
    });
  }

}
