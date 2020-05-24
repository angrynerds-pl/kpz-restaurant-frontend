import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { StatsService } from 'src/app/services/stats.service';
import { StatsProduct } from 'src/app/models/stats-product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  options: ChartOptions = { 
    responsive: true,
    scales : {
      yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            maxTicksLimit: 10
          }
      }]
    }
  };

  colorsBest: any[] = [ { backgroundColor: "#98D8B1" } ]
  chartType: ChartType = 'bar';
  legend = true;

  labelsBest: Label[] = [];
  labelsWorst: Label[] = [];
  labelsPie: Label[] = [];

  chartDataBest: ChartDataSets[] = [ { data: [], label: 'Bestseller' } ];
  chartDataWorst: ChartDataSets[] = [ { data: [], label: 'Worst selling' } ];
  chartDataPie: SingleDataSet = [];

  bestProducts: Array<StatsProduct>;
  worstProducts: Array<StatsProduct>;
  categories: Array<StatsProduct>;

  bestSubscription: Subscription;
  worstSubscription: Subscription;
  categoriesSubscription: Subscription;

  dateFrom: Date;
  dateTo: Date;

  picked: boolean = false;

  constructor(private statsService:StatsService) { }

  ngOnInit(): void {

  }

  load(){
    if(this.dateFrom && this.dateTo){
      
      const startDate = this.dateFrom.toISOString().slice(0,10);
      const endDate = this.dateTo.toISOString().slice(0,10);
      this.clear();

      this.bestSubscription = this.statsService.getBestProducts(startDate, endDate).subscribe(data => {
        this.bestProducts = data;
        this.bestProducts.forEach(product => {
          this.labelsBest.push(product.name);
          this.chartDataBest[0].data.push(product.quantity)
        })
      });
  
      this.worstSubscription = this.statsService.getWorstProducts(startDate, endDate).subscribe(data => {
        this.worstProducts = data;
        this.worstProducts.forEach(product => {
          this.labelsWorst.push(product.name);
          this.chartDataWorst[0].data.push(product.quantity)
        })
      });
  
      this.categoriesSubscription = this.statsService.getProductsByCategories(startDate, endDate).subscribe(data => {
        this.categories = data;
        this.categories.forEach(category => {
          this.labelsPie.push([category.name]);
          this.chartDataPie.push(category.quantity)
        })
      });

      this.picked = true;

    }
  }

  clear(){
    this.labelsBest = [];
    this.labelsWorst = [];
    this.labelsPie = [];
    this.chartDataBest[0].data = [];
    this.chartDataWorst[0].data = [];
    this.chartDataPie = [];
  }

  ngOnDestroy(): void {
    if(this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
    if(this.bestSubscription) this.bestSubscription.unsubscribe();
    if(this.worstSubscription) this.worstSubscription.unsubscribe();
  }


}
