import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAddCategoryComponent } from './menu-add-category.component';

describe('MenuAddCategoryComponent', () => {
  let component: MenuAddCategoryComponent;
  let fixture: ComponentFixture<MenuAddCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAddCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
