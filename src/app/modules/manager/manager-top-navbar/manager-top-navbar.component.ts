import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-top-navbar',
  templateUrl: './manager-top-navbar.component.html',
  styleUrls: ['./manager-top-navbar.component.scss']
})
export class ManagerTopNavbarComponent implements OnInit {

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
