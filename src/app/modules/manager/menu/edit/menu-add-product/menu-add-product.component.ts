import { Component, OnInit, OnDestroy } from "@angular/core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductService } from "src/app/services/product.service";
import { CategoryService } from "src/app/services/category.service";
import { ToastrService } from "ngx-toastr";
import { MenuCategory } from "src/app/models/menu-category";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: "app-menu-add-product",
  templateUrl: "./menu-add-product.component.html",
  styleUrls: ["./menu-add-product.component.scss"]
})
export class MenuAddProductComponent implements OnInit, OnDestroy {
  
  acceptIcon = faCheck;
  cancelIcon = faTimes;

  categories: MenuCategory[];

  categoriesSubscription: Subscription;
  productSubscription: Subscription;

  public productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.newCategoryForm();
  }

  loadCategories() {
    this.categoriesSubscription = this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  newCategoryForm() {
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      categoryName: [null,Validators.required]
    });
  }

  createProduct() {
    if (this.productForm.valid) {
      const categoryName = this.productForm.get('categoryName').value;
      this.productSubscription = this.productService.addProduct(this.productForm.value, categoryName).subscribe(data => {
        this.toastrService.success('Product has been added');
        this.router.navigateByUrl('/manager/statistics', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/manager/menu']);
        }); 
      }, err => {
        this.toastrService.error('Name has been already taken');
      })
      this.resetForm();
    }
  }

  resetForm() {
    this.productForm.reset();
  }

  ngOnDestroy(){
    this.categoriesSubscription.unsubscribe();
    if(this.productSubscription) this.productSubscription.unsubscribe();
  }

}
