import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { StatsService } from 'src/app/services/stats.service';
import { StatsTraffic } from 'src/app/models/stats-traffic';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  options: ChartOptions = { responsive: true };
  labels: Label[] = [];
  chartType: ChartType = 'bar';
  legend = true;

  chartData: ChartDataSets[] = [];

  today: boolean = true;
  week: boolean = true;
  month: boolean = true;

  todayData = { data: [], label: 'Today' };
  weekData = { data: [], label: 'Week' };
  monthData = { data: [], label: 'Month' };

  todayTraffic: Array<StatsTraffic>;
  weekTraffic: Array<StatsTraffic>;
  monthTraffic: Array<StatsTraffic>;
  
  startTime: number = 10;
  endTime: number = 22;

  constructor(private statsService:StatsService) { }

  ngOnInit() {
    this.initData();
  }

  initData(){

    this.labels = [];
    this.todayData = { data: [], label: 'Today' };
    this.weekData = { data: [], label: 'Week' };
    this.monthData = { data: [], label: 'Month' };

    this.getTodayTraffic();
    this.getWeekTraffic();
    this.getMonthTraffic();
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

  getTodayTraffic(){
    this.statsService.getCustomersTraffic('today',this.startTime,this.endTime).subscribe(data => {
      this.todayTraffic = data;
      this.todayTraffic.forEach(traffic => {
        this.labels.push(traffic.startTime.slice(0,5) + " - " + traffic.endTime.slice(0,5));
        this.todayData.data.push(traffic.quantity);
      })
    })
  }

  getWeekTraffic(){
    this.statsService.getCustomersTraffic('week',this.startTime,this.endTime).subscribe(data => {
      this.weekTraffic = data;
      this.weekTraffic.forEach(traffic => {
        this.weekData.data.push(Math.ceil(traffic.quantity/7));
      })
    })
  }

  getMonthTraffic(){
    this.statsService.getCustomersTraffic('month',this.startTime,this.endTime).subscribe(data => {
      this.monthTraffic = data;
      this.monthTraffic.forEach(traffic => {
        this.monthData.data.push(Math.ceil(traffic.quantity/30));
      })
    })
  }

  setPeriod(){
    this.initData();
  }

}
