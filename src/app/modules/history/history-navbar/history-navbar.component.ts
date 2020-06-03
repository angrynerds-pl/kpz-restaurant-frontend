import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-history-navbar',
  templateUrl: './history-navbar.component.html',
  styleUrls: ['./history-navbar.component.scss']
})
export class HistoryNavbarComponent implements OnInit {

  constructor(private storageService:LocalStorageService, private router:Router, 
    private toastrService:ToastrService, private location:Location) { }

  ngOnInit(): void {
  }

  logout(){
    this.storageService.logout();
    this.toastrService.success('See you later!');
    this.router.navigate(['/login']);
  }

  back(){
    this.location.back();
  }

}
