import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAddProductComponent } from './menu-add-product.component';

describe('MenuAddProductComponent', () => {
  let component: MenuAddProductComponent;
  let fixture: ComponentFixture<MenuAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
