import { Component, OnInit } from '@angular/core';
import { faBars } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-waiter-main',
  templateUrl: './waiter-main.component.html',
  styleUrls: ['./waiter-main.component.scss']
})
export class WaiterMainComponent implements OnInit {
  menuIcon = faBars;
  constructor() { }

  ngOnInit(): void {
  }

}
