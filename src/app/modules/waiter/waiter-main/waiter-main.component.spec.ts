import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterMainComponent } from './waiter-main.component';

describe('WaiterMainComponent', () => {
  let component: WaiterMainComponent;
  let fixture: ComponentFixture<WaiterMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
