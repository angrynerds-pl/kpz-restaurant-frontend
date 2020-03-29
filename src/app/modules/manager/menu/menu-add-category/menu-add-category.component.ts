import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/services/manager.service';
import { MenuCategory} from '../../../../models/menu-category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  

  public categoryForm: FormGroup;
  private category:MenuCategory;
  private categoryID:number;

  Logo:string;
  constructor(private managerService:ManagerService, private fb:FormBuilder)//private toastrService:ToastrService)
  {}
  ngOnInit(): void {
    this.newForm();
  }
  handleUpload(e):void{ //próba odczytania ścieżki z pliku

    
    //this.Logo = e.target.result;
    //console.log(this.Logo);
 }
  newForm(){
    this.categoryForm = this.fb.group({
      //id : [null,Validators.required],
      name :[null,Validators.required],
      icon :[null,Validators.required]
    });
  }


  createCategory(){
    if(this.categoryForm.valid){
      this.categoryID = this.managerService.getLastCategoryID();
      this.category = Object.assign({},this.categoryForm.value);
      this.category.id = this.categoryID;
      console.log(this.category);
      this.managerService.addCategory(this.category);
      console.log(this.managerService.getCategories());
      this.resetForm();
      alert('Category added');
      //this.toastrService.success('Category added');
    }
  }

  resetForm(){
    
    this.categoryForm.reset();
  }
}
