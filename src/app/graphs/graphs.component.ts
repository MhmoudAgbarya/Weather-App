import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {

  dataPointsMap = {
    "Temperature": "temp",
    "Pressure": "pressure",
    "Humidity": "humidity"
  }

  @Input() data: any;

  graphData

  constructor() {
  }

  ngOnInit(): void {
    this.graphData = {
      animationEnabled: true,  
      title:{
        text: "Weather Forcast"
      },
      axisX: {
        title: "Time"
      },
      axisY: { 
        title: ""                   
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor:"pointer",
        itemclick: function(e: any) {
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible ){
          e.dataSeries.visible = false;
          } else {
          e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [{        
        type: "spline",
        showInLegend: true,
        name: "Temperature",
        dataPoints: [
        ]
      }, {        
        type: "spline",
        showInLegend: true,
        name: "Pressure",
        dataPoints: [
        ]
      }, {        
        type: "spline",
        showInLegend: true,
        name: "Humidity",
        dataPoints: [
        ]
      }]
    }
  this.addDataPoint("Temperature")
  this.addDataPoint("Pressure")
  this.addDataPoint("Humidity")
  }

  addDataPoint(label: string){
    let index = this.graphData.data.findIndex(e=>e.name == label)
    this.data.forEach(element=>{
      this.graphData.data[index].dataPoints.push({label: element.dt_txt,y: element[this.dataPointsMap[label]]})
    })
  }

}
