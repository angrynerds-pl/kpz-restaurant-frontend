import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { MenuCategory } from "../../../../../models/menu-category";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-menu-add-category",
  templateUrl: "./menu-add-category.component.html",
  styleUrls: ["./menu-add-category.component.scss"]
})
export class MenuAddCategoryComponent implements OnInit {
  acceptIcon = faCheck;
  cancelIcon = faTimes;

  public categoryForm: FormGroup;
  private category: MenuCategory;
  private categoryID: number;

  ;
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.newCategoryForm();
  }
  handleUpload(e): void {
    //próba odczytania ścieżki z pliku
  }
  newCategoryForm() {
    this.categoryForm = this.fb.group({
      //id : [null,Validators.required],
      name: [null, Validators.required],
      icon: [null, Validators.required]
    });
  }

  createCategory() {
    if (this.categoryForm.valid) {
      //this.categoryID = this.categoryService.getLastCategoryID();
      this.category = Object.assign({}, this.categoryForm.value);
      this.category.id = this.categoryID;

      this.categoryService.addCategory(this.category);

      this.resetForm();
      //alert('Category added');
      this.toastrService.success("Category added!");
    }
  }

  resetForm() {
    this.categoryForm.reset();
  }
}
