import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { StatsIncome } from 'src/app/models/stats-income';
import { StatsService } from 'src/app/services/stats.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit, OnDestroy {

  colors: any[] = [ { backgroundColor: ["#ed9191", "#56b3db","#ebda88","#ed9191", "#56b3db","#ebda88"] } ]
  options: ChartOptions = {responsive: true};
  labels: Label[] = [];
  chartType: ChartType = 'bar';
  legend = false;
  chartData: ChartDataSets[] = [{ data: [] }];

  incomeArray: Array<StatsIncome>;

  incomeSubscription: Subscription;

  constructor(private statsService:StatsService) { }

  ngOnInit(): void {
    this.incomeSubscription = this.statsService.getIncome().subscribe(data => {
      this.incomeArray = data;
      this.setChart();
    })
  }

  setChart(){
    this.incomeArray.reverse();
    this.incomeArray.forEach(inc => {
      this.labels.push(inc.month);
      this.chartData[0].data.push(inc.income)
    })
  }

  ngOnDestroy(){
    this.incomeSubscription.unsubscribe();
  }

}
