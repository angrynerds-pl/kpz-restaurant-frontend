import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty-view',
  templateUrl: './empty-view.component.html',
  styleUrls: ['./empty-view.component.scss']
})
export class EmptyViewComponent implements OnInit {

  @Input() booked:boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getClass(){
    if(this.booked){
      return "table-view booked-table";
    }else{
      return "table-view";
    }
  }

}
