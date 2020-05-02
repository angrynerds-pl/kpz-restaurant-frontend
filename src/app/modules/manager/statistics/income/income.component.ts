import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  colors: any[] = [ { backgroundColor: ["#ed9191", "#56b3db","#ebda88","#ed9191", "#56b3db","#ebda88"] } ]
  options: ChartOptions = {responsive: true};
  labels: Label[] = [];
  chartType: ChartType = 'bar';
  legend = false;
  chartData: ChartDataSets[] = [];

  constructor() { }

  ngOnInit(): void {
    this.chartData = [ { data: [13023, 12174, 14467, 8726, 2131, 237] }];
    this.labels = ['December', 'January', 'February', 'March', 'April', 'May'];
  }

}
