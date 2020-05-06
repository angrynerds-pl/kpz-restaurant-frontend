import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  options: ChartOptions = { responsive: true };
  colorsBest: any[] = [ { backgroundColor: "#98D8B1" } ]
  chartType: ChartType = 'bar';
  legend = true;

  labelsBest: Label[] = [];
  labelsWorst: Label[] = [];
  labelsPie: Label[] = [];

  chartDataBest: ChartDataSets[] = [];
  chartDataWorst: ChartDataSets[] = [];
  chartDataPie: SingleDataSet = [];

  constructor() { }

  ngOnInit(): void {
    // Bestsellers
    this.chartDataBest = [ { data: [75, 70, 56, 54, 53], label: 'Bestseller' } ];
    this.labelsBest = ['Classic', 'Margharita', 'Capriciosa', 'Spaghetti', 'Lasagne'];
    // Worst selling
    this.chartDataWorst = [ { data: [1, 3, 4, 6, 9] , label: 'Worst selling' } ];
    this.labelsWorst = ['Hawaii', 'Vege', 'Carbonara', 'Mexicana', 'Peperoni'];
    // Pie chart
    this.labelsPie = [['Pizzas'], ['Drinks'], ['Fish'], ['Salads'], ['Burgers']];
    this.chartDataPie = [873, 345, 65, 235, 543];
  }

}
