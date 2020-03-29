import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { MenuCategory} from '../../../../models/menu-category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-menu-add-category',
  templateUrl: './menu-add-category.component.html',
  styleUrls: ['./menu-add-category.component.scss']
})
export class MenuAddCategoryComponent implements OnInit {

  acceptIcon=faCheck;
  cancelIcon=faTimes;

  categoryForm: FormGroup;
  private category:MenuCategory;
  private categoryID:number;
  constructor(private managerService:ManagerService, private fb:FormBuilder)//,private toastrService:ToastrService)
  {}
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      //id
      //name
      //icon
    });
  }

}
