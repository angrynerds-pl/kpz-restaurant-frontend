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

  incomeMonth: Array<StatsIncome>;

  incomeMonthSubscription: Subscription;
  incomeFirstSubscription: Subscription;
  incomeSecondSubscription: Subscription;
  
  dateFromFirst: Date;
  dateFromSecond: Date;
  dateToFirst: Date;
  dateToSecond: Date;

  constructor(private statsService:StatsService) { }

  ngOnInit(): void {
    this.setChartMonth();
  }

  setChartMonth(){
    this.clear();
    this.incomeMonthSubscription = this.statsService.getIncomeMonths().subscribe(data => {
      this.incomeMonth = data;
      this.incomeMonth.reverse();
      this.incomeMonth.forEach(inc => {
        this.labels.push(inc.month);
        this.chartData[0].data.push(inc.income)
      })
    })
  }

  setChartComparision(){

    if(this.dateFromFirst && this.dateToFirst && this.dateToSecond && this.dateFromSecond){
      
      this.clear();

      const startDateFirst = this.dateFromFirst.toLocaleDateString().replace(/\./g,"-");
      const startDateSecond = this.dateFromSecond.toLocaleDateString().replace(/\./g,"-");
      const endDateFirst = this.dateToFirst.toLocaleDateString().replace(/\./g,"-");
      const endDateSecond = this.dateToSecond.toLocaleDateString().replace(/\./g,"-");

      this.incomeSecondSubscription = this.statsService.getIncomeRange(startDateSecond, endDateSecond).subscribe(data => {
        this.labels.push(startDateSecond + " - " + endDateSecond);
        this.chartData[0].data.push(data.income)
      })

      this.incomeFirstSubscription = this.statsService.getIncomeRange(startDateFirst, endDateFirst).subscribe(data => {
        this.labels.push(startDateFirst + " - " + endDateFirst);
        this.chartData[0].data.push(data.income)
      })

    }
  }

  clear(){
    this.labels = [];
    this.chartData[0].data = [];
  }

  compare(){
    this.setChartComparision();
  }

  reset(){
    this.setChartMonth();
    this.dateFromFirst = null;
    this.dateFromSecond = null;
    this.dateToFirst = null;
    this.dateToSecond= null;
  }

  ngOnDestroy(){
    this.incomeMonthSubscription.unsubscribe();
    if(this.incomeFirstSubscription) this.incomeFirstSubscription.unsubscribe();
    if(this.incomeSecondSubscription) this.incomeSecondSubscription.unsubscribe();
  }

}
