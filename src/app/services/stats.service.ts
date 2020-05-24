import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StatsIncome } from '../models/stats-income';
import { StatsProduct } from '../models/stats-product';
import { StatsTraffic } from '../models/stats-traffic';

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

  // startDate = 2020-04-01
  // endDate = 2020-05-01
  getBestProducts(startDate: string, endDate: string): Observable<Array<StatsProduct>>{
    return this.http.get<Array<StatsProduct>>(this.host + `api/stats/best/range?startDate=${startDate}&endDate=${endDate}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  getWorstProducts(startDate: string, endDate: string): Observable<Array<StatsProduct>>{
    return this.http.get<Array<StatsProduct>>(this.host + `api/stats/worst/range?startDate=${startDate}&endDate=${endDate}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  getProductsByCategories(startDate: string, endDate: string): Observable<Array<StatsProduct>>{
    return this.http.get<Array<StatsProduct>>(this.host + `api/stats/categories/range?startDate=${startDate}&endDate=${endDate}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

  // period = month/week/today
  // startTime = 8
  // endTime = 20
  getCustomersTraffic(period: string, startTime: number, endTime: number): Observable<Array<StatsTraffic>>{
    return this.http.get<Array<StatsTraffic>>(this.host + `api/stats/customers/${period}?startTime=${startTime}&endTime=${endTime}`, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.storageService.getToken()),
    });
  }

}
