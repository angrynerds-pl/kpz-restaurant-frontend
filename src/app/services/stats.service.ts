import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StatsIncome } from '../models/stats-income';
import { StatsProduct } from '../models/stats-product';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  host: string = environment.host;

  constructor(private http:HttpClient, private storageService:LocalStorageService) { }

  getIncome(): Observable<Array<StatsIncome>>{
    return this.http.get<Array<StatsIncome>>(this.host + 'api/stats/income', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  getBestProducts(): Observable<Array<StatsProduct>>{
    return this.http.get<Array<StatsProduct>>(this.host + 'api/stats/best', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  getWorstProducts(): Observable<Array<StatsProduct>>{
    return this.http.get<Array<StatsProduct>>(this.host + 'api/stats/worst', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  getProductsByCategories(): Observable<Array<StatsProduct>>{
    return this.http.get<Array<StatsProduct>>(this.host + 'api/stats/categories', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

}
