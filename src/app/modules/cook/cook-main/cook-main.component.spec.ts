import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookMainComponent } from './cook-main.component';

describe('CookMainComponent', () => {
  let component: CookMainComponent;
  let fixture: ComponentFixture<CookMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
