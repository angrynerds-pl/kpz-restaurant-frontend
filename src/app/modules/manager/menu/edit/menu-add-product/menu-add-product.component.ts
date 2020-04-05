import { Component, OnInit } from "@angular/core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductService } from "src/app/services/product.service";
import { CategoryService } from "src/app/services/category.service";
import { ToastrService } from "ngx-toastr";
import { MenuCategory } from "src/app/models/menu-category";
import { Observable } from "rxjs";
import { MenuProduct } from "src/app/models/menu-product";
@Component({
  selector: "app-menu-add-product",
  templateUrl: "./menu-add-product.component.html",
  styleUrls: ["./menu-add-product.component.scss"]
})
export class MenuAddProductComponent implements OnInit {
  acceptIcon = faCheck;
  cancelIcon = faTimes;

  categories: MenuCategory[];
  private product: MenuProduct;
  public productForm: FormGroup;
  private productID: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.newCategoryForm();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  newCategoryForm() {
    this.productForm = this.fb.group({
      //id: [null, Validators.required],
      name: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      categoryId: [null,Validators.required]
    });
  }

  createProduct() {
    if (this.productForm.valid) {
      this.productID = this.productService.getLastProductID();
      this.product = Object.assign({}, this.productForm.value);
      this.product.id = this.productID;
      console.log(this.product);
      this.productService.addProduct(this.product);

      this.resetForm();
      this.toastrService.success("Product added!");
      console.log(this.productService.getProducts());
    }
  }

  resetForm() {
    this.productForm.reset();
  }
}
