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

  options: ChartOptions = { responsive: true };
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

  constructor(private statsService:StatsService) { }

  ngOnInit(): void {

    this.bestSubscription = this.statsService.getBestProducts().subscribe(data => {
      this.bestProducts = data;
      this.bestProducts.forEach(product => {
        this.labelsBest.push(product.name);
        this.chartDataBest[0].data.push(product.quantity)
      })
    });

    this.worstSubscription = this.statsService.getWorstProducts().subscribe(data => {
      this.worstProducts = data;
      this.worstProducts.forEach(product => {
        this.labelsWorst.push(product.name);
        this.chartDataWorst[0].data.push(product.quantity)
      })
    });

    this.categoriesSubscription = this.statsService.getProductsByCategories().subscribe(data => {
      this.categories = data;
      this.categories.forEach(category => {
        this.labelsPie.push([category.name]);
        this.chartDataPie.push(category.quantity)
      })
    });

  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
    this.bestSubscription.unsubscribe();
    this.worstSubscription.unsubscribe();
  }

}
