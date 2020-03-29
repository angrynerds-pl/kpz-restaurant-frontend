import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {

  @Input() category :boolean =true;

  constructor() { }

  ngOnInit(): void {
  }

  changeEditing(){
    this.category = !this.category;
  }
  
}
