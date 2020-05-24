import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  colors: any[] = [ { backgroundColor: ["#fbbf96", "#ed9191","#89a5d2","#ffe6b9", "#99b898","#45ada8"] } ]
  options: ChartOptions = { responsive: true };
  chartType: ChartType = 'pie';
  legend = true;

  @Input() labels: Label[];
  @Input() chartData: SingleDataSet;

  constructor() { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }

}
