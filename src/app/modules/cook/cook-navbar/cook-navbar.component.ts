import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cook-navbar',
  templateUrl: './cook-navbar.component.html',
  styleUrls: ['./cook-navbar.component.scss']
})
export class CookNavbarComponent implements OnInit {

  constructor(private storageService:LocalStorageService, private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.storageService.logout();
    this.toastrService.success('See you later!');
    this.router.navigate(['/login']);
  }

}
