import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  options: ChartOptions = { responsive: true };
  //colors: any[] = [ { backgroundColor: "#DD6C6C" }, { backgroundColor: "#88ACE2" }, { backgroundColor: "#CFD082" } ]
  labels: Label[] = [];
  chartType: ChartType = 'bar';
  legend = true;

  chartData: ChartDataSets[] = [];

  today: boolean = true;
  week: boolean = true;
  month: boolean = true;

  todayData = {};
  weekData = {};
  monthData = {};

  constructor() { }

  ngOnInit() {
    this.labels = ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    this.todayData = { data: [2, 23, 36, 54, 47, 0, 0, 0], label: 'Today' };
    this.weekData = { data: [23, 33, 46, 64, 57, 12, 23, 43], label: 'Week' };
    this.monthData = { data: [11, 26, 34, 67, 68, 26, 27, 17], label: 'Month' };

    this.setChart();
  }

  check() {
    this.setChart();
  }

  setChart(){
    this.chartData = [];
    if(this.today) this.chartData.push(this.todayData);
    if(this.week) this.chartData.push(this.weekData);
    if(this.month) this.chartData.push(this.monthData);
  }

}
