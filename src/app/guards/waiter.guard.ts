import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class WaiterGuard implements CanActivate {

  constructor(private localStorageService:LocalStorageService, private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return true; // temporary
      // We'll uncomment this later, but for know it would be annoying
      // const role = this.localStorageService.getRole();

      // if(role === 'WAITER' || role === 'HEAD_WAITER'){
      //   return true;
      // }
        
      // this.router.navigate(['/login']);
      // return false;

  }
  
}
